import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Checkbox,
  TextField,
} from "@material-ui/core";
import "./list.css";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  createTodo,
  completeTodo,
  getTodos,
  deleteTodo,
  editTodo,
  setTodos,
} from "../../redux/actions/todos";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "15px",
  },
}));

const TodoListComponent = () => {
  const todoList = useSelector((state) => state.todos);
  const classes = useStyles();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [checked, setChecked] = React.useState([0]);
  const [taskValue, setValue] = React.useState("");
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const addNewTask = () => {
    dispatch(createTodo({ task: task }));

    setTask("");

    setTimeout(() => {
      dispatch(getTodos());
    }, 500);
  };

  const onDrag = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      todoList.todos,
      result.source.index,
      result.destination.index
    );
    dispatch(setTodos(items));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,

    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  const getListStyle = (isDraggingOver) => ({});

  const handleComplete = (value, completed) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch(completeTodo(value, completed));
    setTimeout(() => {
      dispatch(getTodos());
    }, 500);
  };

  const handleDelete = (value) => {
    dispatch(deleteTodo(value));
    setTimeout(() => {
      dispatch(getTodos());
    }, 500);
  };

  const handleChange = (e, id) => {
    dispatch(editTodo(id, e.target.value));
    setTimeout(() => {
      dispatch(getTodos());
    }, 100);
  };

  return (
    <React.Fragment>
      <div className="list-buttons">
        <input
          type="text"
          value={task}
          placeholder="Add a task"
          onChange={handleNewTask}
        />
        <Button className="AddBtn" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
      <DragDropContext onDragEnd={onDrag}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List
                className={classes.root}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {!isLoading && todoList.todos.length === 0 ? (
                  <div className="no-tasks">No tasks available yet</div>
                ) : null}
                {!isLoading
                  ? todoList.todos.map((item, index) => {
                      const labelId = `checkbox-list-label-${item._id}`;
                      return (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                          isDragDisabled={item.completed ? true : false}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              ContainerComponent="li"
                              ContainerProps={{ ref: provided.innerRef }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={item.completed}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                  onClick={() =>
                                    handleComplete(item._id, item.completed)
                                  }
                                />
                              </ListItemIcon>
                              <TextField
                                className="text-field"
                                id="standard-basic"
                                value={item.task}
                                onChange={(e) => handleChange(e, item._id)}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          )}
                        </Draggable>
                      );
                    })
                  : null}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};

export default TodoListComponent;
