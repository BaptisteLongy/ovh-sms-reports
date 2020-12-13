import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

function ReportDetails({ smsListDetails }) {

    return (
        <React.Fragment>
            {/* {(smsListDetails ? smsListDetails.map(sms => <p key={sms.id}>Id: {sms.id} | Crédits: {sms.credits}</p>) : null)} */}
            {(smsListDetails && Array.isArray(smsListDetails)) ?
                <React.Fragment>
                    <Box sx={{marginBottom: '2em'}}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nb total de SMS</TableCell>
                                    <TableCell>Nb total de crédits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{smsListDetails.length}</TableCell>
                                    <TableCell>{smsListDetails.reduce((credits, sms) => credits + sms.credits, 0)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID du SMS</TableCell>
                                    <TableCell>Expéditeur</TableCell>
                                    <TableCell>Nb crédits</TableCell>
                                    <TableCell>Zone tarifaire</TableCell>
                                    <TableCell>Créé</TableCell>
                                    <TableCell>Délivré</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {smsListDetails.map((sms) => (
                                    <TableRow key={sms.id}>
                                        <TableCell >{sms.id}</TableCell>
                                        {/* component="th" scope="row" */}
                                        <TableCell>{sms.sender}</TableCell>
                                        <TableCell>{sms.credits}</TableCell>
                                        <TableCell>{sms.tariffCode}</TableCell>
                                        <TableCell>{new Date(sms.creationDatetime).toString()}</TableCell>
                                        <TableCell>{new Date(sms.deliveredAt).toString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
                : <p>Fais ta sélection et clique !</p>}
        </React.Fragment>
    )
}

export default ReportDetails