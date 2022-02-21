import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    //TODO - remove task from state
    setTasks((currentTasks) => currentTasks.filter((task) => (
      task.id !== id
    )));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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