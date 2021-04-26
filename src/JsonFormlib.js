import React from 'react';
// import { Formik, Form, Field, ErrorMessage,useField, } from 'formik';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {  useFirestoreDocData } from 'reactfire';
import { Fragment, useState, useEffect} from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    materialCells,
    materialRenderers,
  } from '@jsonforms/material-renderers';


const useStyles = makeStyles((_theme) => ({
    container: {
      padding: '1em',
      width: '100%',
    },
    title: {
      textAlign: 'center',
      padding: '0.25em',
    },
    dataContent: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '0.25em',
      backgroundColor: '#cecece',
      marginBottom: '1rem',
    },
    resetButton: {
      margin: 'auto',
      display: 'block',
    },
    demoform: {
      margin: 'auto',
      padding: '1rem',
    },
  }));

let JsonForm =  ( props) => {
    const classes = useStyles();
    let db = firebase.firestore();
    
    
    const [displayDataAsString, setDisplayDataAsString] = useState('');
    const [jsonformsData, setJsonformsData] = useState();
    const dynamic_formcollections = db.collection('dynamic_forms').doc(props.type);
    const formnRef= dynamic_formcollections;
        const { status, data } =  useFirestoreDocData(formnRef);
        if (status === 'loading') {console.log('its loading')}


    useEffect(() => {
        
        setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
      }, [jsonformsData]);
      
    
      const clearData = () => {
        setJsonformsData({});
      };
      const submitData = () => {
        if (jsonformsData !=={})
       
       { 
        db.collection('dynamic_forms').doc(props.type).collection('data').add(jsonformsData)
        setJsonformsData({})}

      };

    
    
    return (<Fragment>
        <h1 className='App-title'>Welcome to Consolidata assessment with firebase and react</h1>
        <Grid
          container
          justify={'center'}
          spacing={1}
          className={classes.container}
        >
          
          <Grid item sm={6}>
            <Typography variant={'h3'} className={classes.title}>
              {data?.title}
            </Typography>
            <div className={classes.demoform}>
             {status ==='success' && <><JsonForms
                schema={data?.schema }
                formData={jsonformsData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ errors, data }) => setJsonformsData(data)}
              />
              <Button
              className={classes.resetButton}
              onClick={submitData}
              color='primary'
              variant='contained'
            >
              Submit
            </Button>
            <Button
              className={classes.resetButton}
              onClick={clearData}
              color='secondary'
              variant='contained'
            >
              Clear data
            </Button></>}
            </div>
          </Grid>
          <Grid item sm={6}>
            <Typography variant={'h3'} className={classes.title}>
              Data Entered
            </Typography>
            <div className={classes.dataContent}>
              <pre id='boundData'>{displayDataAsString}</pre>
            </div>
            
          </Grid>
        </Grid>
      </Fragment>)};
 
 export default  JsonForm;