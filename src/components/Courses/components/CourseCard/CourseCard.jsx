import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Button } from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { dateGenerator } from '../../../../helpers/dateGeneratop';
import './courseCard.css';

const handleClick = () => console.log('button clicked');

export const CourseCard = (props) => {
	const getAuthorName = (ids) => {
		const found = props.authorList
			? props.authorList.filter((i) => ids.includes(i.id))
			: [];
		return found ? found.map((i) => i.name).join(', ') : '';
	};

	return (
		<div className='courseCard'>
			<Card variant='outlined'>
				<CardContent>
					<Grid container spacing={1}>
						<Grid item container md={8}>
							<Grid item md={12}>
								<h4> {props.title}</h4>
							</Grid>
							<Grid item>
								<Typography paragraph>{props.description}</Typography>
							</Grid>
						</Grid>
						<Grid item container md={4}>
							<Grid item md={12}>
								Autors: {getAuthorName(props.autors)}
							</Grid>
							<Grid item md={12}>
								<span>Duration: </span> {pipeDuration(props.duration)} hours
							</Grid>
							<Grid item md={12}>
								<span>Created: </span>
								{dateGenerator(props.creationDate)}
							</Grid>
							<Grid item md={12}>
								<Button text='Show course' handleClick={handleClick} />
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
};
