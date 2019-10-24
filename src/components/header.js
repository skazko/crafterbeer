import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter } from '../actions';

const HeaderStyled = styled.header`
width: 100%;
`;
const HeaderLogo = styled.img``;
const HeaderFilters = styled.ul`
  margin: 0;
  padding: 20px;
  list-style: none;
`;
const HeaderFilter = styled.li`
margin-bottom: 20px;
`;
const FilterCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;

  :checked + label {
    background-color: yellow;
  }
  :focus + label {
    outline: rgb(59, 153, 252) auto 5px;
  }
  `;

const BreweryCheckbox = styled(FilterCheckbox)`
  :checked + label {
    background-color: #f5f5f5;

  }
`;

const FilterButton = styled.label`
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: inline-block;
  margin: 0 10px 10px 0;
`;

const crafterbeerLogo = "https://crafterbeer.ru/wp-content/uploads/2019/02/logo-crafter-small-1.png";

const BreweryLabel = styled(FilterButton)`
  display: flex;
  align-items: center;
  padding: 10px;
  border-width: 0;
  margin: 0;

  &::before {
    content: "";
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('${props => props.breweryImg || crafterbeerLogo }');
  }
`;

const BreweryName = styled.span`
  margin-left: 10px;
  flex-grow: 1;
`;

const BreweryBeersQuantity = styled.span`
  
`;

const FilterSlider = styled.div`
  border-radius: 5px;
  background: #E0E0E0;
  background: linear-gradient(left top, #E0E0E0, #EEEEEE);
  width: 100%;
  height: 10px;
  position: relative;
`;

const SliderThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  /* left: ${props => props.startX}px; */
  background: blue;
  cursor: pointer;
  ${prop => prop.left}
`;

// const MinAlcThumb = styled(SliderThumb)`left: 0;`
// const MaxAlcThumb = styled(SliderThumb)`right: 0;`

const AlcInput = styled.input.attrs((props) => ({
  type: "number",
  placeholder: props.alc,
  step: 0.1,
  max: props.max,
  min: props.min
}))`
margin: 15px;
flex: 1;
padding: 5px;
-moz-appearance: textfield;
:hover,
:focus {
  -moz-appearance: number-input;
}

::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}



`;



class AlcoFilter extends Component {
  state = {
    maxAlc: this.props.maxAlc,
    minAlc: this.props.minAlc,
    leftMax: null,
    rightMin: null,
    sliderLength: null,
    sliderLeft: null,
    thumbWidth: null,
    minX: 0,
    maxX: null,
  }

  minTimer = null;
  maxTimer = null;

  updateSliderSize = () => {
    const slider = document.getElementById('slider-alc');
    const thumb = slider.querySelector('div');
    
    this.setState({
      sliderLength: slider.offsetWidth,
      sliderLeft: slider.getBoundingClientRect().left,
      thumbWidth: thumb.offsetWidth,
      maxX: slider.offsetWidth - thumb.offsetWidth,
      xToAlc: (this.props.maxAlc - this.props.minAlc) / (slider.offsetWidth - 2 * thumb.offsetWidth)
    });
  }

  componentDidMount() {
    this.updateSliderSize();
    window.addEventListener('resize', this.updateSliderSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSliderSize);
  }

  thumbMoveHandler = (extremumAlc, sideEdge, shiftX, thumb) => (e) => {

    const { sliderLength, sliderLeft, rightMin, leftMax, xToAlc, thumbWidth } = this.state;
    let newX = e.clientX - shiftX - sliderLeft;

    const leftEdge = extremumAlc === 'minAlc' ? 0 : rightMin;

    if (newX < leftEdge) {
      newX = leftEdge;
    }

    let rightEdge;
    if (extremumAlc === 'minAlc') {
      rightEdge = sliderLength - thumbWidth - leftMax;
    } else {
      rightEdge = sliderLength - thumbWidth
    }

    if (newX > rightEdge) {
      newX = rightEdge;
    }

    const xPosition = extremumAlc === 'minAlc' ? 'minX' : 'maxX';
    let alc = this.props.minAlc + Math.round(newX * xToAlc * 10) / 10;
    if (alc > this.props.maxAlc) {
      alc = this.props.maxAlc;
    }
    const edgeValue = extremumAlc === 'minAlc' ? newX + thumbWidth : sliderLength - newX;
  
    this.setState({
      [extremumAlc]: alc,
      [sideEdge]: edgeValue,
      [xPosition]: newX
    });
  }

  alcHandler = (extremumAlc, sideEdge) => (e) => {
    e.preventDefault();
    const thumb = e.target;
    const shiftX = e.clientX - thumb.getBoundingClientRect().left;
    const thumbMoveHandler = this.thumbMoveHandler(extremumAlc, sideEdge, shiftX, thumb);

    document.addEventListener('mousemove', thumbMoveHandler);
    document.addEventListener('mouseup', onMouseUp);
  
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', thumbMoveHandler);
    }

  }

  minAlcHandler = this.alcHandler('minAlc', 'rightMin');
  maxAlcHandler = this.alcHandler('maxAlc', 'leftMax');

  checkAlcValue = (alc) => () => {

    this.setState((state) => {
      
      let floated = isNaN(parseFloat(state[alc])) ? this.props[alc] : parseFloat(state[alc]);
      const contrAlc = alc === 'minAlc' ? 'maxAlc' : 'minAlc';
      const xPos = alc === 'minAlc' ? 'minX' : 'maxX'; 

      if (alc === 'minAlc') {
        
        if (floated < this.props[alc]) {
          floated = this.props[alc];
        }

        if (floated > state[contrAlc]) {
          floated = state[contrAlc];
        }

      }
      
      if (alc === 'maxAlc') {

        if (floated > this.props[alc]) {
          floated = this.props[alc]
        }  

        if (floated < state[contrAlc]) {
          floated = state[contrAlc]
        }

      }

      return {
        [alc]: floated,
        [xPos]: (floated - this.props.minAlc) / this.state.xToAlc
      }
      
    })
  }

  alcInputHandler = (alc) => (e) => {

    this.setState({
      [alc]: e.target.value.replace(/,/g, '.').replace(/[^\d.]/g, '')
    });

  }

  render() {
    const {maxAlc, minAlc} = this.state;
    return (
      <div>
        <FilterSlider id="slider-alc">
          <SliderThumb 
            left={`left: ${this.state.minX}px`}
            onMouseDown={(e) => this.minAlcHandler(e)}/>
          <SliderThumb
            left={`left: ${this.state.maxX}px`} 
            onMouseDown={(e) => this.maxAlcHandler(e)}/>
        </FilterSlider>
        <div style={{display: 'flex'}}>
          <AlcInput value={minAlc} 
                    min={this.props.minAlc} 
                    max={maxAlc}
                    onChange={ this.alcInputHandler('minAlc') }
                    onBlur={ this.checkAlcValue('minAlc')}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.checkAlcValue('minAlc')(e)
                      }
                    }}
                    id="min-alc"/>
          <AlcInput value={maxAlc } 
                    min={minAlc} 
                    max={this.props.maxAlc} 
                    onChange={ this.alcInputHandler('maxAlc') }
                    onBlur={ this.checkAlcValue('maxAlc') } 
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.checkAlcValue('maxAlc')(e)
                      }
                    }}
                    id="max-alc"/>
        </div>
        
      </div>
      
    );
  }
}

// const Header = ({ appliedFilters, filters, styleButtonHandler, breweryButtonHandler, sliderHandler, sliderTouchHandler, minHandler, maxHandler }) => {
const Header = ({ filters, updateStyleFilter, updateBreweryFilter }) => {
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;

  return (
    <HeaderStyled>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter>
          <AlcoFilter maxAlc={maxAlc} minAlc={minAlc} />
          
          
        </HeaderFilter>

        <HeaderFilter id="style-filter" hidden>
          {
            styles.map((style) => (
              <Fragment key={style[0]}>
                <FilterCheckbox
                  onChange={(e) => updateStyleFilter(style[0], e.target.checked)} 
                  id={`${style[0].replace(/\s/g, '')}Filter`} 
                  type="checkbox" />
                  

                <FilterButton htmlFor={`${style[0].replace(/\s/g, '')}Filter`}>{style[0]}<span> - {style[1]}</span></FilterButton>
              </Fragment>
              
            ) )
          }
        </HeaderFilter>
        <HeaderFilter id="brewery-filter" hidden>
          {
            breweries.map((brewery) => (
              <Fragment key={brewery[0]}>
                <BreweryCheckbox 
                  onChange={(e) => updateBreweryFilter(brewery[0], e.target.checked)}
                  id={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} 
                  type="checkbox" />
                <BreweryLabel htmlFor={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} breweryImg={brewery[1].img} >
                  <BreweryName>{brewery[0]}</BreweryName>
                  <BreweryBeersQuantity>{brewery[1].quantity}</BreweryBeersQuantity>
                </BreweryLabel>
              </Fragment>
            ) )
          }
        </HeaderFilter>
        
      </HeaderFilters>
    </HeaderStyled>
  );
}

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter }) => {

  const styles = new Map();
  beers.forEach((beer) => {
    let quantity = styles.get(beer.style);
    if (quantity === undefined) {
      quantity = 0;
    }
    quantity += 1;
    styles.set(beer.style, quantity);
  });

  const breweries = new Map();
  beers.forEach((beer) => {
    let quantity;
    let value = breweries.get(beer.brewery);
    if (value === undefined) {
      quantity = 0;
    } else {
      quantity = value.quantity;
    }
    quantity += 1;
    breweries.set(beer.brewery, {quantity, img: beer.breweryImg});
  });
  
  const minAlc = beers.reduce((min, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value < min ? alc.value : min;
  }, 100);

  const maxAlc = beers.reduce((max, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value > max ? alc.value : max;
  }, 0);

  const filters = {
    styles,
    breweries,
    minAlc,
    maxAlc
  }
      
  return <Header filters={filters} 
                 updateStyleFilter={updateStyleFilter} 
                 updateBreweryFilter={updateBreweryFilter}/>
}

const mapStateToProps = ({beerList: {beers}}) => {
  return { beers }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyleFilter: (style, isChecked) => dispatch(updateStyleFilter(style, isChecked)),
    updateBreweryFilter: (brewery, isChecked) => dispatch(updateBreweryFilter(brewery, isChecked))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);