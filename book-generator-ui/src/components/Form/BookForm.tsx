import * as React from 'react';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AGE, CONDITIONS, CORE_VALUES, GENDER, PHONEMS, THEMES } from '../../constants';

interface BookFormProps {
    setBookDetails: (bookDetails: any) => void;
    setEnableGenerateBook: (enableGenerateBook: boolean) => void;
}

export default function BookForm({ setBookDetails, setEnableGenerateBook }: BookFormProps) {
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [theme, setTheme] = React.useState('');
    const [coreValue, setCoreValue] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [phoneme, setPhoneme] = React.useState('');
    const [showPhoneme, setShowPhoneme] = React.useState(false);

    React.useEffect(() => {
        let issue = ""
        if (condition === 'Phonemic') {
            issue = "pronouncing the sound of " + phoneme + "'s"
        } else if (condition === 'Problem Solving') {
            issue = "Phonemic Awareness"
        } 
        setBookDetails({
            "age": age,
            "coreValue": coreValue,
            "gender": gender,
            "theme": theme,
            "issue": issue,
        });
        setEnableGenerateBook(
            age !== '' &&
            condition !== '' &&
            coreValue !== '' &&
            gender !== '' &&
            theme !== '' &&
            (condition !== 'Phonemic' || phoneme !== '')
        );
    }, [age, condition, coreValue, gender, phoneme, setBookDetails, setEnableGenerateBook, theme]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Book Details
            </Typography>
            <FormControl required fullWidth sx={{ mt: 3, ml: 1 }}>
                <InputLabel id="core-value-select-label">Core Value</InputLabel>
                <Select value={coreValue} onChange={(e) => setCoreValue(e.target.value)}>
                    {
                        CORE_VALUES.map((coreValue: string) => (
                            <MenuItem key={coreValue} value={coreValue}>{coreValue}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl required fullWidth sx={{ mt: 3, ml: 1 }}>
                <InputLabel id="theme-select-label">Theme</InputLabel>
                <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    {
                        THEMES.map((theme: string) => (
                            <MenuItem key={theme} value={theme}>{theme}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl required fullWidth sx={{ mt: 3, ml: 1 }}>
                <InputLabel id="age-select-label">Age</InputLabel>
                <Select value={age} onChange={(e) => setAge(e.target.value)}>
                    {
                        AGE.map((age: string) => (
                            <MenuItem key={age} value={age}>{age}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl required fullWidth sx={{ mt: 3, ml: 1 }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                    {
                        GENDER.map((gender: string) => (
                            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl required fullWidth sx={{ mt: 3, ml: 1 }}>
                <InputLabel id="condition-select-label">Condition</InputLabel>
                <Select value={condition} onChange={(e) => {
                    setCondition(e.target.value);
                    setShowPhoneme(e.target.value === 'Phonemic');
                }}>
                    {
                        CONDITIONS.map((condition: string) => (
                            <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            {
                showPhoneme &&
                <FormControl required={showPhoneme} fullWidth sx={{ mt: 3, ml: 1 }}>
                    <InputLabel id="phoneme-select-label">Phoneme</InputLabel>
                    <Select value={phoneme} onChange={(e) => setPhoneme(e.target.value)}>
                        {
                            PHONEMS.map((phoneme: string) => (
                                <MenuItem key={phoneme} value={phoneme}>{phoneme}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            }
        </React.Fragment>
    );
}