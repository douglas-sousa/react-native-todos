import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleEditTask (editedTask: { taskId: number; taskNewTitle: string }) {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (task.id !== editedTask.taskId) {
          return task;
        }

        return {
          ...task,
          title: editedTask.taskNewTitle
        }
      });
      return updatedTasks;
    });
  }

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }
    //TODO - add new task
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          done: !task.done
        }
      });
      return updatedTasks;
    });
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Remoção de item cancelada')
        },
        {
          text: 'Sim',
          onPress: () => {
            //TODO - remove task from state
            console.log('Vai remover a task');
            setTasks((currentTasks) => currentTasks.filter((task) => (
              task.id !== id
            )))
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})