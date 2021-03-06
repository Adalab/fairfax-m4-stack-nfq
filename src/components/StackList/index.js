import React, { Component, Fragment } from 'react';
import ModalInfo from './ModalInfo';
import Filter from './Filter/index';
import Question from './Question/index';
import Footer from '../Footer/index';
import FloatingActionButtons from './Button/index';
import PropTypes from 'prop-types';
import './styles.scss';
import Header from '../Header/index';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';

class StackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.dialogueFunction = this.dialogueFunction.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.resetFilter();
  }

  dialogueFunction() {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  }

  render() {
    const { dataQuestion, createNewQuestion, handleInputValue, searchWord, resetFilter } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="container__stacklist">
        <Header />
        <main className="stacklist__main">
          <Filter handleInputValue={handleInputValue} searchWord={searchWord} />
          {dataQuestion.length ? (
            <Fragment>
              <ul className="question__list">
                {_.sortBy(dataQuestion, question => {
                  return new Date(question.date);
                })
                  .reverse()
                  .filter(question => {
                    return question.question.toLowerCase().includes(searchWord.toLowerCase()) || question.content.toLowerCase().includes(searchWord.toLowerCase()) || question.tags.toLowerCase().includes(searchWord.toLowerCase());
                  })
                  .map(item => {
                    return (
                      <li className="question__item" key={item.id}>
                        <Question item={item} />
                      </li>
                    );
                  })}
              </ul>
              <FloatingActionButtons dialogueFunction={this.dialogueFunction} />
            </Fragment>
          ) : (
            <div className="error__container">
              <CircularProgress color="primary" className="loading__gif" />
              <p className="text__error">No se puede conectar: comprueba tu conexión a Internet o que el servidor funcione correctamente</p>
            </div>
          )}
        </main>
        {isOpen && <ModalInfo dialogueFunction={this.dialogueFunction} createNewQuestion={createNewQuestion} arrLength={dataQuestion.length} resetFilter={resetFilter} />}
        <Footer />
      </div>
    );
  }
}

StackList.propTypes = {
  dataQuestion: PropTypes.arrayOf(PropTypes.object),
  createNewQuestion: PropTypes.func,
  handleInputValue: PropTypes.func,
  searchWord: PropTypes.string
};

export default StackList;
