import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CoreValues, EMOTIONAL_CONDITIONS, SPEECH_CONDITIONS, SemanticFields } from '../../constants';

export default function BookForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Book Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="core-value-select-label">Core Value</InputLabel>
                        <Select>
                            {
                                CoreValues.map((coreValue: string) => (
                                    <MenuItem key={coreValue} value={coreValue}>{coreValue}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="core-value-select-label">Semantic Field</InputLabel>
                        <Select>
                            {
                                SemanticFields.map((semanticField: string) => (
                                    <MenuItem key={semanticField} value={semanticField}>{semanticField}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="core-value-select-label">Speech Condition</InputLabel>
                        <Select>
                            {
                                SPEECH_CONDITIONS.map((speechCondition: string) => (
                                    <MenuItem key={speechCondition} value={speechCondition}>{speechCondition}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="core-value-select-label">Emotional Condition</InputLabel>
                        <Select>
                            {
                                EMOTIONAL_CONDITIONS.map((emotionalCondition: string) => (
                                    <MenuItem key={emotionalCondition} value={emotionalCondition}>{emotionalCondition}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}