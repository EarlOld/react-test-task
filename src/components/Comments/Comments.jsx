import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

import './Comments.scss';

class Comments extends Component {
    handleSubmitForm = (event) => {
        const { addNewComment } = this.props;

        event.preventDefault();
        addNewComment(event.target[0].value, event.target[1].value);
        event.target.reset();
    }

    handleKeyDown = (event) => {
        if (event.ctrlKey && event.keyCode === 13) {
            if (event.target.value.length !== 0) {
                event.target.form[2].click();
            }
          }
    }

    render() {
        const { data } = this.props;

        return (
            <div className="react-comments">
                <h1>Comments #{data && data.id}</h1>
                {data && data.comments.map(item => <Comment key={item.id} data={item} />)}
                <form onSubmit={this.handleSubmitForm}>
                    <input type="color" className="form-control" />
                    <textarea onKeyDown={this.handleKeyDown} className="form-control" placeholder="Type comment here..." required />
                    <button className="btn btn-primary" type="su">Add New</button>
                </form>
            </div>
        );
    }
}

Comments.propTypes = {
    data: PropTypes.object,
    addNewComment: PropTypes.func
};

export default Comments;
