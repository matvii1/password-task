import classNames from 'classnames';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/main.scss';
import { getStrength } from './utils/getIsTwoCombinated';

export function App() {
  const [query, setQuery] = useLocalStorage('query', '');
  const isShort = query.trim().length < 8;

  const strength = getStrength(query);
  const isEasy = strength === 'easy' && !isShort;
  const isMedium = strength === 'medium' && !isShort;
  const isStrong = strength === 'strong' && !isShort;
  const isEmpty = strength === 'empty';

  const handleOnChange = (event) => {
    if (event.target.value === event.target.value.trim()) {
      setQuery(event.target.value);
    }
  }

  const backgroundLogic = {
    borderColor: ((isShort || isEasy) && !isEmpty) 
      ? "rgb(181, 82, 82)"
      : isMedium ? "rgb(251, 236, 68)"
      : isStrong ? "rgb(100, 164, 75)"
      : "rgb(171, 171, 171)"
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="form-container">
        {isShort && !isEmpty && (
          <div className="password-message">
            Password should not be less than 8 characters
          </div>
        )}
        <form 
          className="form"
          onSubmit={handleOnSubmit}
        >
          <input 
            className="form__input"
            type="password"
            value={query}
            onChange={handleOnChange}
            style={backgroundLogic}
          >
          </input>
        </form>

        <div className="messages">
          <div 
            className={classNames(
              'messages__message',
              'messages__message--easy',
              { 'has-red': ((isShort && !isEmpty) || isEasy) },
              { 'has-grey': isEmpty },
              { 'has-yellow': isMedium && !isShort },
              { 'has-green': isStrong && !isShort },
            )}
          >
            Easy
          </div>
          <div 
            className={classNames(
              'messages__message',
              'messages__message--medium',
              { 'has-red': (isShort && !isEmpty) && !isMedium },
              { 'has-grey': (isEmpty || isEasy) && !isMedium },
              { 'has-yellow': isMedium && !isShort },
              { 'has-green': isStrong && !isShort },
            )}
          >
            Medium
          </div>
          <div 
            className={classNames(
              'messages__message',
              'messages__message--strong',
              { 'has-red': isShort && !isEmpty },
              { 'has-grey': isEmpty || isEasy || isMedium },
              { 'has-yellow': false },
              { 'has-green': isStrong && !isShort },
            )}
          >
            Strong
          </div>
        </div>
      </div>
    </div>
  );
}
