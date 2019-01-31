import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';

const Comment = ({ data }) =>  {
    return (
        <div className="react-comment">
            <div className="card">
                <div className="card-color" style={{ background: data.color }}></div>
                <div className="card-body">
                    <pre className="card-text">{data.body}</pre>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    data: PropTypes.object,
};

export default Comment;
