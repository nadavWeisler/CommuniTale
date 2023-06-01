import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];



export default function PrintForm() {
  const [format, setFormat] = useState('pdf');

  function getProductFromFormat() {
    let products = [{
      name: 'Your new book',
      desc: 'Pro subscription',
      price: '$9.99',
    }];
    if (format === 'pdf') {
      products.push({ 
        name: 'PDF format',
        desc: 'Another thing',
        price: 'free',
      });
    } else if(format === 'printed') {
      products.push({
        name: 'Printed format',
        desc: 'Using Lupa service, you will receive an email for update your shipping address',
        price: '$9.99',
      });
    }
    return products;
  }

  function getPrice() {
    let price = 9.99;
    if (format === 'pdf') {
      price += 0;
    } else if(format === 'printed') {
      price += 9.99;
    }
    return price;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Format</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
          <FormControlLabel value="printed" control={<Radio />} label="Printed" />
        </RadioGroup>
      </FormControl>
      <List disablePadding>
        {getProductFromFormat().map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getPrice()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}