import { Grid } from '@mui/material';
import './App.css';
import { Header } from './components/Header/Header';
import { mockedAuthorsList, mockedCourseList } from './constants';
import { useEffect, useState } from 'react';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Courses } from './components/Courses/Courses';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import env from 'react-dotenv';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [courseList, setCourseList] = useState(mockedCourseList);
	const [user, setUser] = useState();
	//useNavigate replaced useHistory
	const navigate = useNavigate();

	useEffect((e) => {
		const token = localStorage.getItem('token');
		const url = document.URL.toString();
		if (token && !url.includes('courses')) {
			navigate('/courses');
		} else if (!token && url === env.BASE_URL) {
			navigate('/login');
		}
	});

	const addAuthor = (author) => {
		setAuthorList([...authorList, author]);
	};

	const addCourse = (course) => {
		setCourseList([...courseList, course]);
	};

	return (
		<div className='App'>
			<Grid container spacing={2}>
				<Grid item md={12}>
					<Header user={user} onUserChange={(u) => setUser(u)} />
				</Grid>
				<Routes>
					{/* <Route path='' element={<Navigate to='/courses' />} /> */}
					<Route
						path='/login'
						element={<Login onUserChange={(u) => setUser(u)} />}
					/>
					<Route path='/register' element={<Registration />} />
					<Route
						path='/courses/add'
						element={
							<CreateCourse
								return={addCourse}
								addAuthor={addAuthor}
								authorList={authorList}
							/>
						}
					/>
					<Route
						path='/courses'
						element={
							<Courses courseList={courseList} authorList={authorList} />
						}
					/>
					<Route
						path='/courses/:id'
						element={
							<CourseInfo courseList={courseList} authorList={authorList} />
						}
					/>
				</Routes>
			</Grid>
		</div>
	);
}

export default App;
