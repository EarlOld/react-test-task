import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Items.scss';

class Items extends Component {
    state = {
        items: []
    };

    handleSubmitForm = (event) => {
        event.preventDefault();
        this.props.addNewItem(event.target[0].value);
        event.target.reset();
    }

    handleSetActiveItem = (item) => {
        const { setActiveItem } = this.props;

        setActiveItem(item);
    }

    handleDeleteItem = (event, item) => {
        const { deleteItem } = this.props;

        event.stopPropagation();
        event.preventDefault();
        deleteItem(item);
    }

    render() {
        const {
            props: {
                data,
                activeItem
            },
            handleSetActiveItem,
            handleDeleteItem
        } = this;

        return (
            <div className="react-items">
                <h1>Items</h1>
                <form className="react-items-input-group" onSubmit={this.handleSubmitForm}>
                    <input type="text" className="form-control" placeholder="Type name here..." required />
                    <button className="btn btn-info" type="su">Add New</button>
                </form>
                <ul className="list-group">
                    {data.map((item, index) => {
                        return (
                            <li onClick={() => handleSetActiveItem(item)} key={index} className={item.id === activeItem.id ? 'list-group-item d-flex justify-content-between align-items-center active-item' : 'list-group-item d-flex justify-content-between align-items-center'}>
                                {item.name}
                                <span className="badge badge-info badge-pill">{item.comments.length}</span>
                                <button onClick={(e) => handleDeleteItem(e, item)} type="button" className="btn btn-outline-danger">Delete</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

Items.propTypes = {
    data: PropTypes.array,
    activeItem: PropTypes.object,
    addNewItem: PropTypes.func,
    deleteItem: PropTypes.func,
    setActiveItem: PropTypes.func
};

export default Items;
