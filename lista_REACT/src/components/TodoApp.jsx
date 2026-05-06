import React, { useEffect } from 'react'
import { useState } from 'react'

const TodoApp = () => {
    
    const confirmacao = () => window.confirm("Tem certeza?")
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [deletandoId, setDeletandoId] = useState(null);
    const [deleteAll, setDeleteAll] = useState(false)
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {

        const todoSalvo = localStorage.getItem('todos');

        console.log("localStorage Carregado")

        if (todoSalvo) {
            setTodos(JSON.parse(todoSalvo));
        };

        setCarregado(true);

    }, []);

    useEffect(() => {
        if (carregado){
            localStorage.setItem('todos', JSON.stringify(todos));
            console.log("Salvo o estado.");
        };

    }, [todos, carregado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValue.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: inputValue
            }
            setTodos((prevTodos) => [...prevTodos, newTodo])
            setInputValue("")
        }
    }

    const deleteTodo = (id) => {
        setDeletandoId(id)
        setTimeout(() => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
            setDeletandoId(null)
        }, 200)
    }

    const deleteAlls = () => {

        const resposta = confirmacao()
            
        if(resposta){
            setDeleteAll(true)
            setTimeout(() =>{
                setTodos([])
                setDeleteAll(false)
            }, 200)
        }

    }

  return (
    <div className='app-container'>
        <h1 className='title'>Lista de Tarefas</h1>
        
        <form onSubmit={handleSubmit} className='form-container'>
            <input
            className='input-field'
            type="text"
            placeholder='Adicione uma tarefa...'
            value={inputValue}
            onChange={(e) => (setInputValue(e.target.value))}
            />
            <button type='submit' className='add-button'> Adicionar </button>
        </form>

        {todos.length > 1 && <button className='delete-allTodo' onClick={() => deleteAlls()}> Deletar tudo </button>}

        {todos.length === 0 && <p className='text'>Não há tarefas.</p>}

        <ul className='todo-list'>
            {todos.map((todo) => (
                <li key={todo.id} className={todo.id === deletandoId || deleteAll ? 'todo-item deleting' : 'todo-item'}>
                    {todo.text}
                    <button className='delete-button' onClick={() => deleteTodo(todo.id)}> Excluir </button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TodoApp