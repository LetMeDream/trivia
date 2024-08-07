/* MUI Card */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TiMediaPause, TiMediaPlay  } from "react-icons/ti";
import useCard from '../../hooks/useCard';
import classNames from 'classnames';

export default function MediaCard({ setGameOver, points, setPoints }) {
		const {
			time,
			counting,
			pause,
			resume,
			parentRef,
			cardModule,
			options,
			question,
			img,
			handleClick,
			type,
			lives,
			capitalizeFirstLetter
		} = useCard({ points, setPoints, setGameOver })

    const styles = {
        container: `relative`,
        counter: 'text-[2rem] text-emerald-500 top-[-3rem] rounded-md flex justify-between items-center w-full px-6 border border-emerald-300 mb-2',
				button: ' text-4xl text-emerald-500 hover:text-emerald-400'
    }

		const loadingScreen = classNames('bg-emerald-400 transition-all duration-1000 absolute h-full w-full top-0 left-0 z-10', {
			'mt-[150%]': counting
		})

  return (
		<div>
			<div className={styles.container + ''}>
					<div className={styles.counter}>
						{time}
						{counting ? (
							<button
								className={styles.button}
								onClick={pause}
							>
								<TiMediaPause />
							</button>
						) : (
							<button
								className={styles.button}
								onClick={resume}
							>
								<TiMediaPlay />
							</button>
						)
						}
						
					</div>
					<Card sx={{ maxWidth: 360 }} className='relative'>
						<CardMedia
							sx={{height:'180px'}} 
							component="img"
							image={img}
							alt="green iguana"
						/>
						<CardContent>
							<div style={{ display:'flex', justifyContent:'space-around' }}>
								<div style={{ display:'flex', alignItems:'center', marginBottom:'0.35rem' }}>{points}</div>
								<Typography gutterBottom variant="h5" component="div" sx={{ textAlign:'center' }}>
								Tema: {type ? capitalizeFirstLetter(type) : ''}
								</Typography>
								<div style={{ display:'flex', alignItems:'center', marginBottom:'0.35rem' }}>
									<Badge badgeContent={lives} color="primary" showZero>
										<FavoriteBorderIcon color="action" />
									</Badge>
								</div>
							</div>
							<Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
								{question.pregunta}
							</Typography>
						</CardContent>
						<CardActions disableSpacing={true} sx={{flexDirection:'column',gap:'2px',alignItems:'center'}}>
							<div className={cardModule.buttonsContainer} ref={parentRef}>
								{ 
									options.map((option,i) => {
									return (
													<Button 
															key={i}
															onClick={(e)=>{handleClick(option,e)}}
															sx={{width:'80%'}}
															size="small" variant='outlined'>{option}
													</Button>
													)
									}) 
								}
							</div>
						</CardActions>

						<div className={loadingScreen}>

						</div>
					</Card>
			</div>
		</div>

  );
}
