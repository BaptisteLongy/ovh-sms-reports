import React, { useState, useEffect } from 'react'
import Criteria from './criteria'
import ReportDetails from './reportDetails'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { ovh } from '../utils/ovh'
import frLocale from 'date-fns/locale/fr';
import Box from '@material-ui/core/Box';
import LoadingButton from '@material-ui/lab/LoadingButton';


function SmsConsumptionReport() {
    const [smsJobList, setSmsJobList] = useState();
    const [smsJob, setSmsJob] = useState('');
    const [startingDate, setStartingDate] = useState();
    const [endingDate, setEndingDate] = useState();
    const [smsListDetails, setSmsListDetails] = useState([]);
    const [loadingReport, setLoadingReport] = useState(false);
    const [senderList, setSenderList] = useState();

    useEffect(() => {
        ovh.request('GET', '/sms', function (err, jobList) {
            setSmsJobList(jobList);
        });
    }, []);

    const buildDateParams = () => {
        let params = "?"
        if (startingDate) {
            params = params + "creationDatetime.from=" + startingDate
        }
        if (endingDate) {
            if (params !== "?") { params = params + "&" }
            params = params + "creationDatetime.to=" + endingDate
        }

        return (params === "?") ? "" : params
    }

    const handleReportClick = () => {
        if (smsJob !== "") {
            setLoadingReport(true)
            ovh.request('GET', '/sms/' + smsJob + '/outgoing' + buildDateParams(), async function (err, smsList) {
                let tempPromise
                let tempSmsList = []
                let tempSmsIdList
                while (smsList.length > 0) {
                    tempSmsIdList = smsList.splice(0, 500)
                    tempPromise = []
                    // eslint-disable-next-line no-loop-func
                    tempSmsIdList.forEach(smsId => {
                        tempPromise.push(ovh.requestPromised('GET', '/sms/' + smsJob + '/outgoing/' + smsId).then(function (sms, err) {
                            tempSmsList.push(sms)
                        }))
                    })
                    await Promise.all(tempPromise)
                }
                setSmsListDetails(tempSmsList)
                setLoadingReport(false)
            });
        }
    }

    const handleJobChange = (theNewJob) => {
        setSmsJob(theNewJob)
        updateSenderList(theNewJob)
    }

    const updateSenderList = (job) => {
        ovh.request('GET', '/sms/' + job + '/senders', function (err, senderList) {
            setSenderList(senderList);
        });
    }

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                {smsJobList ?
                    <Box sx={{ marginTop: '1em', marginBottom: '1em', padding: '12px' }}>
                        <Criteria handleStartingDateChange={setStartingDate} handleEndingDateChange={setEndingDate} jobList={smsJobList} handleJobChange={handleJobChange} senderList={senderList}/>
                        <Box sx={{ marginTop: '1em' }}>
                            <LoadingButton onClick={handleReportClick} pending={loadingReport} variant="contained">
                                Rapport
                            </LoadingButton>
                        </Box>
                    </Box>
                    : <p>Loading</p>
                }
                <ReportDetails smsListDetails={smsListDetails} />
            </LocalizationProvider>
        </React.Fragment>
    )
}

export default SmsConsumptionReport