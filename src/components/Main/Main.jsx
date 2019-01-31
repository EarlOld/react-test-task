import React, { Component } from 'react';
import Items from '../Items';
import Comments from '../Comments';
import IdGenerator from '../../libs/idGenerator';
import './Main.scss';

const idGenerator = new IdGenerator();

class Main extends Component {
    state = {
        items: [
            {
                id: idGenerator.generate(),
                name: 'Test',
                comments: [
                    {
                        id: '0-0',
                        body: 'Test',
                        color: 'black'
                    }
                ]
            }
        ],
        activeItem: null
    };

    componentWillMount() {
        const { items, activeItem } = this.state;

        const itemsFromStore = JSON.parse(window.localStorage.getItem('items'));
        const activeItemFromStore = JSON.parse(window.localStorage.getItem('activeItem'));

        if (itemsFromStore && itemsFromStore.length) {
            this.setState({
                items: [...itemsFromStore],
                activeItem: {
                    ...activeItemFromStore
                }
            });
        } else {
            if (!activeItem && items && items[0]) {
                this.setActiveItem(items[0]);
            }
        }
    }

    componentDidUpdate() {
        const { items, activeItem } = this.state;

        window.onunload = () => {
            window.localStorage.setItem('items', JSON.stringify(items));
            window.localStorage.setItem('activeItem', JSON.stringify(activeItem));
        };
    }

    setActiveItem = (item) => {
        this.setState({
            activeItem: {
                ...item,
                comments: [
                    ...item.comments
                ]
            }
        });
    }


    addNewItem = (name) => {
        const { items } = this.state;

        const item = {
            name,
            id: idGenerator.generate(),
            comments: []
        };

        if (!items.length) {
          this.setActiveItem(item);
        }


        this.setState({
            items: [
                ...items,
                item
            ]
        });
    };

    deleteItem = (item) => {
        const { items } = this.state;
        const newItems = items.filter(i => i.id !== item.id);

        this.setState({
            items: [
                ...newItems,
            ]
        });

        if (newItems.length) {
            this.setActiveItem(newItems[newItems.length - 1]);
        } else {
            this.setState({
                activeItem: null
            });
        }
    };

    addNewComment = (color, body) => {
        const { activeItem, items } = this.state;

        activeItem.comments.push({
            id: `${activeItem.id}-${activeItem.comments.length}`,
            body,
            color
        });

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === activeItem.id) {
                items[i] = {
                    ...activeItem
                };
                break;
            }
        }

        this.setState({
            items: [
                ...items
            ],
            activeItem: {
                ...activeItem
            }
        });
    };

    render() {
        const {
            state: {
                items,
                activeItem
            },
            addNewItem,
            setActiveItem,
            addNewComment,
            deleteItem
        } = this;

        return (
            <main className="react-main container">
                <div className="row justify-content-around">
                    <div className="col-xs-6">
                        <Items
                            data={items}
                            activeItem={activeItem}
                            addNewItem={addNewItem}
                            setActiveItem={setActiveItem}
                            deleteItem={deleteItem}
                        />
                    </div>
                    <div className="col-xs-6">
                        <Comments
                            data={activeItem}
                            addNewComment={addNewComment}
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;
