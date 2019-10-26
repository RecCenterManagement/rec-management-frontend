import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Container, Table, TableCell, TableHead,
  TableRow, TableBody, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 896,
    backgroundColor: '#efebe9'
  },
  background: {
    backgroundColor: '#8e774d'
  },
  cont: {
    backgroundColor: '#fafafa'
  },
  th: {
    backgroundColor: '#8d6e63'
  }
})


const AboutUs = () => {
    const classes = useStyles()
    return (    
        <div className={classes.background}>
            <br />
                <Container maxWidth="md" className={classes.cont}>
                <br />
                <a>
                    <h1>About Us</h1>
                </a>  
                <p>
                The <b>University Recreation and Well-Being</b> is a department within the Division of Student Affairs.<br /><br />
                <b>Department Vision:</b> A leader in providing excellent and comprehensive experiences that promote
                student success and community well-being.<br /><br />
                <b>Department Mission:</b> The Mission of University Recreation and Well-Being is to 
                offer programs, services and facilities that foster student development, create a connection 
                to Oakland University and motivate our community toward a life-long commitment of well-being.
                </p>
            <h2>Meet the Staff:</h2>
             
    <Paper className={classes.root}>
    <table className={classes.table} aria-label="spanning table">
    <TableBody>
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/2016/GregJ2016.JPG" 
                        alt="Greg Jordan" width="150" height="201"></img></TableCell>     
        <TableCell><b>GREG JORDAN</b><br />Director of University Recreation and Well-Being<br />
        <a href="mailto:jordan@oakland.edu">jordan@oakland.edu</a><br /> (248) 370-4888
    </TableCell>
    </TableRow>
            
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/Becky%20Lewis_150w.jpg" 
                        alt="BECKY LEWIS" width="150" height="195"></img></TableCell>     
        <TableCell><b>BECKY LEWIS</b><br />Associate Director of Programs & Administration<br />
        <a href="mailto:lewis236@oakland.edu">lewis236@oakland.edu</a><br /> (248) 370-4910
    </TableCell>
    </TableRow>
            
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/Marie%20VanBuskirk_150W.png" 
                        alt="MARIE VANBUSKIRK" width="150" height="225"></img></TableCell>     
        <TableCell><b>MARIE VANBUSKIRK</b><br />Assistant Director of Leadership & Engagement<br />
        <a href="mailto:taylor4@oakland.edu">taylor4@oakland.edu</a><br /> (248) 370-2663
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17990_059_Bill%20Singleton_150W.jpg" 
                        alt="BILL SINGLETON" width="150" height="185"></img></TableCell>     
        <TableCell><b>BILL SINGLETON</b><br />Assistant Director of Facilities & Aquatics<br />
        <a href="mailto:wsingleton@oakland.edu">wsingleton@oakland.edu</a><br /> (248) 370-4882
    </TableCell>
    </TableRow>
     
     <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/2016/JillL2016.JPG" 
                        alt="JILL LAWSON" width="150" height="192"></img></TableCell>     
        <TableCell><b>JILL LAWSON</b><br />Assistant Director of Budget & Business Operations<br />
        <a href="mailto:lawson@oakland.edu">lawson@oakland.edu</a><br /> (248) 370-4880
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/2016/MikeR2016.JPG" 
                        alt="MICHAEL ROSSI" width="150" height="182"></img></TableCell>     
        <TableCell><b>MICHAEL ROSSI</b><br />Aquatics Coordinator<br />
        <a href="mailto:pooldoc@oakland.edu">pooldoc@oakland.edu</a><br />  (248) 370-4534
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/2016/ErinD2016.JPG" 
                        alt="ERIN DAVIDSON" width="150" height="214"></img></TableCell>     
        <TableCell><b>ERIN DAVIDSON</b><br />Fitness Programs & Services Coordinator<br />
        <a href="mailto:elwolak@oakland.edu">elwolak@oakland.edu</a><br /> (248) 370-4911
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/Jordan%20Leslie_150w.jpg" 
                        alt="JORDAN LESLIE" width="150" height="187"></img></TableCell>     
        <TableCell><b>JORDAN LESLIE</b><br />Intramural & Club Sports Coordinator<br />
        <a href="mailto:leslie@oakland.edu">leslie@oakland.edu</a><br /> (248) 370-4885
    </TableCell>
    </TableRow>
  
    <TableRow>
        <TableCell>No image available</TableCell>     
        <TableCell><b>DALE KOLNITYS</b><br />Coordinator, Facility Operations<br />
        <a href="mailto:kolnitys@oakland.edu">kolnitys@oakland.edu</a><br />  (248) 370-4881
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/Stephanie1.jpg" 
                        alt="STEPHANIE WILLIS" width="150" height="204"></img></TableCell>     
        <TableCell><b>STEPHANIE WILLIS</b><br />Wellness & Educational Outreach Coordinator<br />
        <a href="mailto:willis@oakland.edu">willis@oakland.edu</a><br />  (248) 370-4968
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17990_047_Megan%20C_150w.jpg" 
                        alt="MEGAN CHOINIERE" width="150" height="196"></img></TableCell>     
        <TableCell><b>MEGAN CHOINIERE</b><br />Member Services Coordinator<br />
        <a href="mailto:mchoiniere@oakland.edu">mchoiniere@oakland.edu</a><br /> (248) 370-4533
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17993-003_cortney%20heileman_150W.jpg" 
                        alt="CORTNEY HEILEMAN" width="150" height="209"></img></TableCell>     
        <TableCell><b>CORTNEY HEILEMAN</b><br />Health & Wellness Coordinator<br />
        <a href="mailto:cheileman@oakland.edu">cheileman@oakland.edu</a><br /> (248) 370-4424
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17991-006_Molly%20Gagnon_150W.jpg" 
                        alt="MOLLY GAGNON" width="150" height="192"></img></TableCell>     
        <TableCell><b>MOLLY GAGNON</b><br />Marketing & Communications Coordinator<br />
        <a href="mailto:mgagnon2@oakland.edu">mgagnon2@oakland.edu</a><br /> (248) 370-4912
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell>No image available</TableCell>     
        <TableCell><b>KATHRYN AYER</b><br />Office Manager<br />
        <a href="mailto:kayer@oakland.edu">kayer@oakland.edu</a><br /> (248) 370-4884
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17991-001_Hailey%20Forbes_150W.jpg" 
                        alt="HAILEY FORBES" width="150" height="163"></img></TableCell>     
        <TableCell><b>HAILEY FORBES</b><br />Graduate Assistant & Fitness<br />
        <a href="mailto:hforbes@oakland.edu">hforbes@oakland.edu</a><br /> (248) 370-4594
    </TableCell>
    </TableRow>
    
    <TableRow>
        <TableCell><img src="https://oakland.edu/Assets/Oakland/recwell/graphics/staff-photos/UCM-17990_062_Daniel%20Desimone_150W.jpg" 
                        alt="DAN DESIMONE" width="150" height="184"></img></TableCell>     
        <TableCell><b>DAN DESIMONE</b><br />Graduate Assistant & IM/CS Sports<br />
        <a href="mailto:ddesimone@oakland.edu">ddesimone@oakland.edu</a><br /> (248) 370-4914
    </TableCell>
    </TableRow>
    
   
    
    </TableBody>
    </table>
    </Paper>
    <br />
    </Container>  
    <br />
    </div> 
    )

}

export default AboutUs