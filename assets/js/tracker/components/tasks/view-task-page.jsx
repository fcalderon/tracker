import React from 'react';
import {TaskForm} from "./task-form";
import {TaskService} from "../../service/task.service";
import {connect} from "react-redux";

// export class ViewTaskPage extends React.Component {
//     constructor(props) {
//         super();
//         this.state = {loading: true};
//
//         TaskService.get(props.match.params.id)
//             .then((taskRes) => {
//                 this.setState({ loading: false, task: taskRes.data })
//             })
//             .catch(error => {
//                 console.log('Error getting task', error);
//             })
//
//     }
//
//
//     render() {
//         return (<div>
//             <h1>View task page</h1>
//             {
//                 this.state.loading
//                     ?
//                     <div>Loading</div>
//                     :
//                     <TaskForm model={Object.assign({}, this.state.task)}
//                               readOnly={true} />
//
//             }
//         </div>)
//     }
// }
class ViewTaskPageComponent extends React.Component{
    componentWillMount() {
        console.log('Component will mount');
        const id = this.props.match.params.id;
        console.log(id);
        TaskService.getById(id);
    }
    render() {
        return (<div>
            <h1>View task page</h1>
            {
                !this.props.task
                    ?
                    <div>Loading</div>
                    :
                    <TaskForm model={Object.assign({}, this.props.task)} readOnly={true} />

            }

        </div>)
    }

}
export const ViewTaskPage = connect((state) => state.tasks)(ViewTaskPageComponent);