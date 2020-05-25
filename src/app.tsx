import React from 'react';

// @ts-ignore
import logo from '../assets/favicon.png';

type Task = { text: string, checked: boolean };

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const jsonTasks = localStorage.getItem('tasks');
        const tasks = jsonTasks ? JSON.parse(jsonTasks) : [];
        this.state = {tasks};
    }

    onInputChange = (event: any) => {
        this.setState({editingValue: event.target.value});
    };

    finishEditing = () => {
        const {tasks} = this.state;
        tasks[this.state.editingIndex].text = this.state.editingValue;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks, editingIndex: -1});
    };

    onInputBlur = () => {
        this.finishEditing();
    };

    onEditClick = (index: number) => {
        this.startEditing(index);
    };

    onUncheckClick = (index: number) => {
        const {tasks} = this.state;
        tasks[index].checked = false;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});
    };

    onDeleteClick = (index: number) => {
        const {tasks} = this.state;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});
    };

    onCheckClick = (index: number) => {
        const {tasks} = this.state;
        tasks[index].checked = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});
    };

    onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.finishEditing();
        }
    };

    renderEditing = (task: Task, i: number) => {
        return (<a className="list-group-item" key={i}>
            <input onKeyDown={this.onKeyDown} className="form-control" autoFocus type="text"
                   value={this.state.editingValue} onChange={this.onInputChange} onBlur={this.onInputBlur}/>
        </a>);
    };

    renderLiTaskChecked = (task: Task, i: number) => {
        if (!task.checked) {
            return;
        }
        if (this.state.editingIndex == i) {
            return this.renderEditing(task, i);
        }

        const empty = task.text.trim().length == 0;
        const val = empty ? <i>Empty</i> : task.text;
        return (<a className="list-group-item d-flex align-items-center task-list-group-item" key={i}>
            <span className="p-2"><del>{val}</del></span>
            <span className="ml-auto p-2">
            <button onClick={this.onEditClick.bind(this, i)} className="btn btn-lg">
                <i className="fas fa-edit"></i>
            </button>
            <button onClick={this.onDeleteClick.bind(this, i)} className="btn btn-lg">
                <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={this.onUncheckClick.bind(this, i)} className="btn btn-lg gray">
                <i className="fas fa-check"></i>
            </button>
            </span>
        </a>);
    };

    renderLiTaskUnchecked = (task: Task, i: number) => {
        if (task.checked) {
            return;
        }
        if (this.state.editingIndex == i) {
            return this.renderEditing(task, i);
        }

        const empty = task.text.trim().length == 0;
        const val = empty ? <i>Empty</i> : task.text;
        return (<a className="list-group-item d-flex align-items-center task-list-group-item" key={i}>
            <span className="p-2">{val}</span>
            <span className="ml-auto p-2">
            <button onClick={this.onEditClick.bind(this, i)} className="btn btn-lg">
                <i className="fas fa-edit"></i>
            </button>
            <button onClick={this.onDeleteClick.bind(this, i)} className="btn btn-lg">
                <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={this.onCheckClick.bind(this, i)} className="btn btn-lg black">
                <i className="fas fa-check"></i>
            </button>
            </span>
        </a>);
    };

    startEditing = (index: number) => {
        const {tasks} = this.state;
        this.setState({editingIndex: index, editingValue: tasks[index].text});
    };

    addTask = () => {
        const {tasks} = this.state;
        tasks.push({text: "", checked: false});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({tasks});
        this.startEditing(tasks.length - 1);
    };

    renderList = () => {
        const {tasks} = this.state;
        const liTasksUnchecked = tasks.map(this.renderLiTaskUnchecked);
        const liTasksChecked = tasks.map(this.renderLiTaskChecked);
        const liTasks = [...liTasksUnchecked, ...liTasksChecked];
        const key = liTasks.length;
        liTasks.unshift(<a onClick={this.addTask} className="list-group-item list-group-item-primary" key={key}>Add
            Task</a>);
        return <div className="list-group">{liTasks}</div>
    };

    renderHeader = () => {
        return (<header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <img className="logo" src={logo} alt="logo"/>
                <a className="navbar-brand" href="#">JustinTime ToDo List</a>
            </nav>
        </header>);
    };

    renderMain = () => {
        const list = this.renderList();
        return (<main role="main" className="main">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-md-6 col-lg-12">
                        {list}
                    </div>
                </div>
            </div>
        </main>);
    };

    renderFooter = () => {
        return (<footer className="footer mt-auto py-3">
            <div className="container">
                <span className="text-muted">Developed by <a href="https://justino.com.br/">Tiago Justino</a></span>
            </div>
        </footer>);
    };

    render = () => {
        const header = this.renderHeader();
        const main = this.renderMain();
        const footer = this.renderFooter();
        return (<>
            {header}
            {main}
            {footer}
        </>);
    };
}

export {App};
