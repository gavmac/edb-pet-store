import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, List, Toolbar, AppBar, CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { mainListItems } from './listitems';
import PetsTable from './petsTable';
import PetForm from './petForm'
import {getData, postData} from "../../Services/services";

import type { Pet } from './models/Pet'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  sideBar: {
    paddingTop: '90px',
    backgroundColor: '#fff'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


type State = {
  resolved: boolean,
  loading: boolean,
  error: boolean | null,
}


const Dashboard = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState<Pet[]>([])
  const [status, setStatus] = useState<State>({
    resolved: false,
    loading: false,
    error: null,
  });

  const addPet = async (data) => {
    const {name} = data;
    setStatus({loading: true, resolved: false, error: null});

    postData('pets', {name}).then(
      data => {
        if (!data.error) {
          setStatus({loading: false, resolved: true, error: null});
          getPets();
        } else {
          setStatus({loading: false, resolved: false, error: data.error})
        }
      }
    )
  }

  const getPets = () => {
    getData('pets').then(
      data => {
        setTableData(data)
      }
    )
  }

  useEffect( () => {
    getPets()
  },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar>
        <Toolbar className={classes.toolbar}>
        </Toolbar>
      </AppBar>
      <div className={classes.sideBar}>
        <List>{mainListItems}</List>
      </div>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <PetForm addPet={addPet} status={status}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <PetsTable pets={tableData}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}


export default Dashboard