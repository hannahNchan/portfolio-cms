import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';

import CareerPath from './careerPath';
import Modal from '../../components/Modal';
import SnackBar from '../../components/SnackBar';
import {_POST_CREATE_NEW} from '../../api';

const CareerItemsPath = () => {
  const [path, setPath] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPath, setNewPath] = useState([
    {
      date: new Date(),
      content: {
        activities: [],
        description: '',
        title: '',
        subtitle: '',
        technologies: [],
      }
    }
  ]);

  const cleanModalState = () => {
    setNewPath([
      {
        date: new Date(),
        content: {
          activities: [],
          description: '',
          title: '',
          subtitle: '',
          technologies: [],
        }
      }
    ])
  };

  const [alert, setAlert] = useState({
    type: '', message: '', open: false
  });

  const onHandleClickOpen = () => {
    setOpen(true);
  };

  const onHandleClose = () => {
    setOpen(false);
    cleanModalState();
  };

  const onHandleSave = async () => {
    setOpen(false);
    const payload = {
      date: newPath[0].date,
      ...newPath[0].content
    };
    const response = await _POST_CREATE_NEW(payload);
    if (response.status === 'ok') {
      setAlert({
        ...alert,
        open: true,
        type: 'success',
        message: response.payload.message
      })
      fetchAPI(); 
      cleanModalState();
    }
  };

  useEffect(() => {
    fetchAPI() 
  },[])

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

  return (
    <>
      <Button style={{ marginBottom: '1rem' }} onClick={onHandleClickOpen} variant="outlined" color="primary">
        Add new Job
      </Button>
      <CareerPath dataPath={path} fetchAPI={fetchAPI}/>
      <Modal
        title="Add new Job"
        handleSave={onHandleSave}
        handleClose={onHandleClose}
        open={open}>
        <CareerPath isModal dataPath={newPath} />
      </Modal>
      <SnackBar 
        open={alert.open}
        severity={alert.type}
        message={alert.message}
      />
    </>
  )
}

export default CareerItemsPath
