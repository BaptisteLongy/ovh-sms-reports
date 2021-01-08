import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/core/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function Criteria(props) {
    const [startingDate, setStartingDate] = useState(new Date());
    const [endingDate, setEndingDate] = useState(new Date());
    const [job, setJob] = useState('');
    const [selectedSenders, setSelectedSenders] = useState([]);

    useEffect(() => {
        if (isValidDate(startingDate)) {
            let tempDate = startingDate
            tempDate.setHours(0, 0, 0, 0)
            props.handleStartingDateChange(tempDate.toISOString())
        } else {
            props.handleStartingDateChange("")
        }
    }, [props, startingDate])

    useEffect(() => {
        if (isValidDate(endingDate)) {
            let tempDate = endingDate
            tempDate.setHours(23, 59, 59, 999)
            props.handleEndingDateChange(tempDate.toISOString())
        } else {
            props.handleEndingDateChange("")
        }
    }, [props, endingDate])

    useEffect(() => {
        setSelectedSenders([])
    }, [props])

    const handleJobChange = (e) => {
        setJob(e.target.value)
        props.handleJobChange(e.target.value)
    }

    return (
        <React.Fragment>
            <Grid container direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel >Compte SMS</InputLabel>
                        <Select
                            value={job}
                            onChange={handleJobChange}
                        >
                            <MenuItem value=''>Aucun</MenuItem>
                            {props.jobList.map(smsJob => <MenuItem value={smsJob} key={smsJob}>{smsJob}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                {(props && props.senderList) ?
                    <Grid item xs={3}>
                        <Autocomplete
                            value={selectedSenders}
                            onChange={(event, newSenders) => {
                                setSelectedSenders(newSenders);
                            }}
                            multiple
                            options={props.senderList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Senders" />
                            )}
                        />
                    </Grid>
                    : null}
                <Grid item>
                    <DatePicker
                        renderInput={(props) => <TextField {...props} helperText="jj/mm/aaaa" />}
                        label="Début"
                        value={startingDate}
                        onChange={setStartingDate}
                    />
                </Grid>
                <Grid item>
                    <DatePicker
                        renderInput={(props) => <TextField {...props} helperText="jj/mm/aaaa" />}
                        label="Fin"
                        value={endingDate}
                        onChange={setEndingDate}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Criteria