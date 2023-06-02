import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Pricing from './components/Pricing';
import { Box, CssBaseline, Link, Typography } from '@mui/material';
import { NavBar } from './components/NavBar';
import CreateBookDialog from './components/Form/CreateBookDialog';
import { About } from './components/About';

function App() {
  const [showFormDialog, setShowFormDialog] = React.useState(false);

  function closeFormDialog() {
    setShowFormDialog(false);
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <>
      <CssBaseline />
      <NavBar openCreateBookForm={() => setShowFormDialog(true)} />
      <Routes>
        <Route path="/" element={<Home openCreateBookForm={() => setShowFormDialog(true)} />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <CreateBookDialog
        showFormDialog={showFormDialog}
        closeFormDialog={closeFormDialog}
      />
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </>
  );
}

export default App;
