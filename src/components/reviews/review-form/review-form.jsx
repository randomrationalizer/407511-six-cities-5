import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const defaultState = {
  author: `user`,
  avatar: `https://www.fillmurray.com/g/300/300`,
  date: ``,
  rating: ``,
  review: ``
};

const RatingValueToTitle = {
  "1": `terribly`,
  "2": `badly`,
  "3": `not bad`,
  "4": `good`,
  "5": `perfect`
};


class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
  }

  handleFormFieldChange(evt) {
    const {name, value} = evt.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {onFormSubmit} = this.props;

    return (
      <form className="reviews__form form" action="#" method="post"
        onSubmit={(evt) => {
          evt.preventDefault();
          onFormSubmit({
            author: this.state.author,
            avatar: this.state.avatar,
            date: new Date(),
            rating: this.state.rating,
            text: this.state.review
          });
          this.setState(() => (
            defaultState
          ));
        }}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Object.entries(RatingValueToTitle).sort((a, b) => b[0] - a[0]).map(([value, title]) =>
            <React.Fragment key={value}>
              <input
                onChange={this.handleFormFieldChange}
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={this.state.rating === value ? true : ``}
                required
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          )}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={this.handleFormFieldChange}
          value={this.state.review}
          required
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};

export default ReviewForm;
