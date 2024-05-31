import { React } from 'react'
import {Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Category from './pages/Category';
import Search from './pages/Search';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import SignUp from './pages/SignUp';


function AppRouter() {
    return (

            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/category"  element={<Category />} />
                <Route path="/search"  element={<Search />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/category/:id" exact element={<Category />} />
                <Route path="/post/:id" exact  element={<SinglePost />} /> 
                <Route path="*"  element={<Login/>}/> 

            </Routes>


    )
}

export default AppRouter
