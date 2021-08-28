import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';

import CareerPath from './careerPath';
import Modal from '../../components/Modal';

const CareerItemsPath = () => {
  const [path, setPath] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPath, setNewPath] = useState([
    {
      date: new Date(),
      content: {
        activities: [],
        description: '',
        tile: '',
        subtitle: '',
        technologies: [],
      }
    }
  ]);

  const onHandleClickOpen = () => {
    setOpen(true);
  };

  const onHandleClose = () => {
    setOpen(false);
  };

  const onHandleSave = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAPI = () => {
      fetch('http://localhost:8000/career')
        .then(response => response.json())
        .then(({ payload }) => {
          setPath(payload.map(i => {
            return {
              date: i.date,
                content: {
                  ...i.content,
                  activities: JSON.parse(i.content.activities),
                  technologies: JSON.parse(i.content.technologies)
                }
            }
          }));
        })
    }

    fetchAPI() 
  },[])

  return (
    <>
      <Button style={{ marginBottom: '1rem' }} onClick={onHandleClickOpen} variant="outlined" color="primary">
        Add new Job
      </Button>
      <CareerPath dataPath={path} />
      <Modal
        title="Add new Job"
        handleSave={onHandleSave}
        handleClose={onHandleClose}
        open={open}>
        <CareerPath isModal dataPath={newPath} />
      </Modal>
    </>
  )
}

export default CareerItemsPath
