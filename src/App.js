import React from 'react';

function calcReducer(calc, action) {
  const { edited, waitingForNumber } = calc;
  
  const newObj = { ...calc };

  if(waitingForNumber && !action.type === 'number') {
    newObj.waitingForNumber = false;
    if(newObj[edited].endsWith('.'))
      newObj[edited] = newObj[edited].slice(0, newObj[edited.length - 1]);
    return newObj ;
  }

  switch(action.type) {
    case 'number': {
      let noLeadingZeros = calc[edited];
      
      if(!noLeadingZeros)
        noLeadingZeros = '';

      while(noLeadingZeros.startsWith('0') && !noLeadingZeros.includes('.'))
        noLeadingZeros = noLeadingZeros.slice(1);

      newObj[edited] = noLeadingZeros + action.value;
      break;
    }

    case 'clear': {
      return { a: 0, b: null, operator: null, edited };
    }

    case 'toggle-sign': {
      newObj[edited] *= -1;
      break;
    }

    case 'percent': {
      newObj[edited] = (calc[edited] / 100).toFixed(2);
      break;
    }

    case 'dot': {
      if(newObj[edited].includes('.'))
        break;

      newObj.waitingForNumber = true;
      newObj[edited] += '.';
      break;
    }

    case 'operator': {
      newObj.edited = 'b';
      newObj.b = '0';
      newObj.operator = action.value;
      break;
    }

    case 'calculate': {
      newObj.edited = 'a';
      newObj.b = null;
      newObj.operator = null;

      switch(calc.operator) {
        case '÷':
          newObj.a = calc.a / calc.b;
          break;

        case '×':
          newObj.a = calc.a * calc.b;
          break;

        case '−':
          newObj.a = calc.a - calc.b;
          break;

        case '+':
          newObj.a = parseFloat(calc.a) + parseFloat(calc.b);
          break;

        default:
          newObj.a = '0';
          console.error('Unrecognized operator');
      }

      break;
    }

    default: {
      throw new Error('Unrecoginzed action type: ' + action.type);
    }
  }

  return newObj;
}

export default function App() {
  const [calc, calcDispatch] = React.useReducer(calcReducer, {
    a: '0',
    b: null,
    operator: null,
    edited: 'a',
    waitingForNumber: false
  });

  function handleClick(event) {
    const { dataset } = event.target;

    calcDispatch({
      type: dataset.type,
      value: dataset.value
    });
  }

  return (
    <div className="website">

      <article className="calculator">

        <div className="calculator__top">

          <span className="calculator__top-1">{calc.b === null ? '' : calc.a} {calc.operator}</span>

          <span className="calculator__top-2">{calc.b ?? calc.a}</span>

        </div>

        <div className="calculator__buttons">

          <button 
            className="calculator__button calculator__button--color-2"
            onClick={handleClick}
            data-type={'clear'}
          >
            C
          </button>

          <button 
            className="calculator__button calculator__button--color-2"
            onClick={handleClick}
            data-type={'toggle-sign'}
          >
            ±
          </button>

          <button 
            className="calculator__button calculator__button--color-2"
            onClick={handleClick}
            data-type={'percent'}
          >
            %
          </button>

          <button 
            className="calculator__button calculator__button--color-3"
            onClick={handleClick}
            data-type={'operator'}
            data-value={'÷'}
          >
            ÷
          </button>


          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={7}
            data-type={'number'}
          >
            7
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={8}
            data-type={'number'}
          >
            8
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={9}
            data-type={'number'}
          >
            9
          </button>


          <button 
            className="calculator__button calculator__button--color-3"
            onClick={handleClick}
            data-type={'operator'}
            data-value={'×'}
          >
            ×
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={4}
            data-type={'number'}
          >
            4
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={5}
            data-type={'number'}
          >
            5
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={6}
            data-type={'number'}
          >
            6
          </button>


          <button 
            className="calculator__button calculator__button--color-3"
            onClick={handleClick}
            data-type={'operator'}
            data-value={'−'}
          >
            −
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={1}
            data-type={'number'}
          >
            1
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={2}
            data-type={'number'}
          >
            2
          </button>

          <button 
            className="calculator__button" 
            onClick={handleClick}
            data-value={3}
            data-type={'number'}
          >
            3
          </button>


          <button 
            className="calculator__button calculator__button--color-3"
            onClick={handleClick}
            data-type={'operator'}
            data-value={'+'}
          >
            +
          </button>

          <button 
            className="calculator__button calculator__button--col-2"
            onClick={handleClick}
            data-value={0}
            data-type={'number'}
          >
            0
          </button>

          <button 
            className="calculator__button"
            onClick={handleClick}
            data-type={'dot'}
          >
            ●
          </button>

          <button 
            className="calculator__button calculator__button--color-3"
            onClick={handleClick}
            data-type={'calculate'}
          >
              =
          </button>

        </div>

      </article>

    </div>
  );
}