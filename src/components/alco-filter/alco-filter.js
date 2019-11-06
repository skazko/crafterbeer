import React, { Component } from 'react';
import styled from 'styled-components';

const FilterSlider = styled.div`
  border-radius: 5px;
  background-color: #eeeeee;
  width: 100%;
  height: 10px;
  position: relative;
  z-index: 1;`;

const SliderActiveRange = styled(FilterSlider)`
  position: absolute;
  background-color: blue;
  z-index: 5;`;

const SliderThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  background: blue;
  cursor: pointer;
  z-index: 10;`;

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

  :hover, :focus {
    -moz-appearance: number-input;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }`;

class AlcoFilter extends Component {
  state = {
    maxAlc: Math.min(this.props.maxAlc, this.props.appliedAlc.max),
    minAlc: Math.max(this.props.minAlc, this.props.appliedAlc.min),
    leftMax: null,
    rightMin: null,
    sliderLength: null,
    sliderLeft: null,
    thumbWidth: null,
    minX: 0,
    maxX: null,
  }

  updateSliderSize = () => {
    const slider = document.getElementById('slider-alc');
    const thumb = slider.querySelector('div');
    console.log('func update slider size');
    
    this.setState((state) => {
      const maxAlc = Math.min(this.props.maxAlc, this.props.appliedAlc.max);
      const minAlc = Math.max(this.props.minAlc, this.props.appliedAlc.min);
      const newXToAlc = (this.props.maxAlc - this.props.minAlc) / (slider.offsetWidth - 2 * thumb.offsetWidth);
      
      return {
        minAlc,
        maxAlc,
        sliderLength: slider.offsetWidth,
        sliderLeft: slider.getBoundingClientRect().left,
        thumbWidth: thumb.offsetWidth,
        maxX: (maxAlc - this.props.minAlc) / newXToAlc + thumb.offsetWidth,
        minX: (minAlc - this.props.minAlc ) / newXToAlc,
        xToAlc: newXToAlc
      }
    });
  }

  componentDidMount() {
    
    this.updateSliderSize();
    window.addEventListener('resize', this.updateSliderSize);
  }

  componentDidUpdate(prevProps) {
    console.log('did update');
    const {max, min} = this.props.appliedAlc;
    const {max: prevMax, min: prevMin} = prevProps.appliedAlc;
    const isMaxEqual = max === prevMax;
    const isMinEqual = min === prevMin;
   
    
    if (!isMaxEqual && !isMinEqual) {
      
      console.log(`max: ${max}   prevMax : ${prevMax}`);
      console.log(`min: ${min}   prevMin : ${prevMin}`);
      this.updateSliderSize();
    }
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSliderSize);
  }

  getClientX = (e) => {
    if (e instanceof MouseEvent) {
      return e.clientX;
    }
    if (e instanceof TouchEvent) {
      return e.changedTouches[0].clientX;
    }
  }

  getMoveEventName = (e) => {

    if (e instanceof MouseEvent) {
      return 'mousemove';
    }
    if (e instanceof TouchEvent) {
      
      return 'touchmove';
    }
  }
  
  getMoveEndEventName = (e) => {
    if (e instanceof MouseEvent) {
      return 'mouseup';
    }
    if (e instanceof TouchEvent) {
      return 'touchend';
    }
  }

  thumbMoveHandler = (extremumAlc, sideEdge, shiftX) => (e) => {    
    const { sliderLength, sliderLeft, rightMin, leftMax, xToAlc, thumbWidth } = this.state;
    const xPosition = extremumAlc === 'minAlc' ? 'minX' : 'maxX';
    const leftEdge = extremumAlc === 'minAlc' ? 0 : rightMin;
    let newX = this.getClientX(e) - shiftX - sliderLeft;
    let rightEdge;

    if (newX < leftEdge) {
      newX = leftEdge;
    }

    if (extremumAlc === 'minAlc') {
      rightEdge = sliderLength - thumbWidth - leftMax;
    } else {
      rightEdge = sliderLength - thumbWidth
    }

    if (newX > rightEdge) {
      newX = rightEdge;
    }
    
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
    const onMoveEnd = () => {
      this.props.updateAlcFilter({...this.state});
      document.removeEventListener(MOVE_END_EVENT_NAME, onMoveEnd);
      document.removeEventListener(MOVE_EVENT_NAME, thumbMoveHandler);
    }

    e.preventDefault();

    const MOVE_EVENT_NAME = this.getMoveEventName(e.nativeEvent);
    const MOVE_END_EVENT_NAME = this.getMoveEndEventName(e.nativeEvent);
    const thumb = e.target;
    const shiftX = this.getClientX(e.nativeEvent) - thumb.getBoundingClientRect().left;
    const thumbMoveHandler = this.thumbMoveHandler(extremumAlc, sideEdge, shiftX);

    document.addEventListener(MOVE_EVENT_NAME, thumbMoveHandler);
    document.addEventListener(MOVE_END_EVENT_NAME, onMoveEnd);
  }

  minAlcHandler = this.alcHandler('minAlc', 'rightMin');
  maxAlcHandler = this.alcHandler('maxAlc', 'leftMax');

  checkAlcValue = (alc) => (e) => {
    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.keyCode !== 13) {
        return;
      }
    }

    this.setState((state) => {
      
      let floated = isNaN(parseFloat(state[alc])) ? this.props[alc] : parseFloat(state[alc]);
      const contrAlc = alc === 'minAlc' ? 'maxAlc' : 'minAlc';
      const xPos = alc === 'minAlc' ? 'minX' : 'maxX'; 
      let newXPos;

      if (alc === 'minAlc') {
        
        if (floated < this.props[alc]) {
          floated = this.props[alc];
        }

        if (floated > state[contrAlc]) {
          floated = state[contrAlc];
        }
        newXPos = (floated - this.props.minAlc) / this.state.xToAlc;
        
      }
      
      if (alc === 'maxAlc') {

        if (floated > this.props[alc]) {
          floated = this.props[alc]
        }  

        if (floated < state[contrAlc]) {
          floated = state[contrAlc]
        }
        newXPos = (floated - this.props.minAlc) / this.state.xToAlc + state.thumbWidth;
      }

      this.props.updateAlcFilter({...state, [alc]: floated});

      return {
        [alc]: floated,
        [xPos]: newXPos
      }    
    });
  }

  alcInputHandler = (alc) => (e) => {
    this.setState({
      [alc]: e.target.value.replace(/,/g, '.').replace(/[^\d.]/g, '')
    });
  }

  render() {
    const { maxAlc, minAlc, minX, maxX, thumbWidth } = this.state;
    
    return (
      <div style={{ padding: '10px' }}>
        <FilterSlider id="slider-alc">
          <SliderThumb 
            style={{left: `${minX}px`}}
            onMouseDown={this.minAlcHandler}
            onTouchStart={this.minAlcHandler}/>
          <SliderThumb
            style={{left: `${maxX}px`}}
            onMouseDown={this.maxAlcHandler}
            onTouchStart={this.maxAlcHandler}/>
          <SliderActiveRange style={{
            left: `${minX + thumbWidth / 2}px`,
            width: `${maxX - minX}px`
          }}/>
        </FilterSlider>
        
        <div style={{ display: 'flex' }}>
          <AlcInput 
            value={ minAlc } 
            min={ this.props.minAlc } 
            max={ maxAlc }
            onChange={ this.alcInputHandler('minAlc') }
            onBlur={ this.checkAlcValue('minAlc') }
            onKeyUp={ this.checkAlcValue('minAlc') }/>
          <AlcInput 
            value={ maxAlc } 
            min={ minAlc } 
            max={ this.props.maxAlc } 
            onChange={ this.alcInputHandler('maxAlc') }
            onBlur={ this.checkAlcValue('maxAlc') } 
            onKeyUp={ this.checkAlcValue('maxAlc') }/>
        </div>
        
      </div>
      
    );
  }
}

export default AlcoFilter;