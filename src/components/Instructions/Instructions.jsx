import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function Instructions({text}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>
        {text}  
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Instrucciones realmente simples:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1, mb:2 }}>
              <ol className='list-disc'>
                <li>Tienes 5 vidas.</li>
                <li>Las respuestas correctas otorgan 10 puntos. Las incorrectas descuentan 5.</li>
                <li>Tienes 15 segundos por pregunta.</li>
              
              </ol>
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Maneras de perder:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              <ol className='list-disc'>
                <li>Obtener puntos negativos (menor a 0) termina el juego</li>
                <li>Perder las 5 vidas, termina el juego.</li>
                <li>Si el contador de segundos (los cuales son 15) llega a cero, termina el juego.</li>
              </ol>
              <div className='text-center mt-2'>
                ¡Buena suerte!
              </div> 
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}