import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 896,
    backgroundColor: '#efebe9',
  },
  background: {
    backgroundColor: '#8e774d'
  },
  cont: {
    backgroundColor: '#fafafa',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  th: {
    backgroundColor: '#8d6e63'
  },
  signupButton: {
    margin: theme.spacing(1)

  },
  textcenter: {
    textAlign: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  imagecenter: {
    width: '100%',
    marginTop: 'auto'
  }
}
))

const OutdoorComplex = () => {
    const classes = useStyles()
    return(
        <div className={classes.background}>
          <br />
          <Container maxWidth="md" className={classes.cont}>
              <br />
              <img src="https://oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/REC-13599_Outdoor%20Complex.jpg" 
                alt="image" className={classes.imagecenter}></img>
              <hr />
              <p>
              The Recreation and Athletic Outdoor Complex allows different exercise alternatives outside of our indoor facilities. Members have access to the Outdoor Complex, except when they are reserved for organizational use. 
              Read more about <a href='/policies'>Outdoor Complex usage policies.</a> 
              </p>
              <h1>Amenities</h1>
              <h3>Operational Season</h3>
              <p>
              The Outdoor Complex operational season is from April 1 through October 31 of each year. Please reference the <a href='/facilityhours'>Facility Hours and Schedule page</a> for hours of operation.
              </p>
              <h3>Recreation Superfield</h3>
              <ul>
                <li>Rec South: A 65 yard by 120 yard East-West Artificial Turf Field 
                  <ul>
                    <li>White Lines: Soccer (also for common lines for Women's Lacrosse, Men's Lacrosse, Football, Rugby</li>
                    <li>Yellow Lines: Women's Lacrosse</li>
                    <li>Blue Lines: Men's Lacrosse</li>
                  </ul>
                </li>
                <li>Rec East: A 40 yard by 100 Yard North-South Artificial Turf Field</li>
                <li>Rec Central: A 40 yard by 100 yard North-South Artificial Turf Field</li>
                <li>Rec West: A 40 Yard by 100 Yard North- South Artificial Turf Field</li>
                <li>Softball Rec South: An Artificial Turf Softball field overlay on Rec South</li>
                <li>Softball Rec East: An Artificial Turf Softball field overlay on Rec East and Rec Central</li>
              </ul>
              <h3>Tennis Courts</h3>
              <ul>
                <li>8 Tennis Courts (4 with overhead lights)</li>
              </ul>
              <h3>Outdoor Track</h3>
              <ul>
                <li>8 Lane Track</li>
                <li>In Field: 70 yard by 120 yard North-South Field marked for Soccer inside the Track</li>
              </ul>
              <h3>Support Building</h3>
              <ul>
                <li>Men's, Women's, and Gender Neutral Restrooms</li>
                <li>Drinking Fountain &amp; Waterbottle Fill Station</li>
              </ul>
              <h3>Grizzly Oaks Disc Golf Course:</h3>
              Located immediately East of the RAOC and field events space, the course is open to the entire Oakland University community.  Highlights include: 
              <br />
              <ul>
                <li>Start and Finish in the same basic area; along the very north portion of the course (alongside Meadowbrook Road)</li>
                <li>Total distance is 4,494 feet (2,472 on the front 9, 2022 on the back 9)</li>
                <li>All holes are a minimum of 150 feet with 9 holes over 200 feet and 4 holes over 300 feet</li>
                <li>Hole design takes advantage of the natural environment, offering a wide variety of shot selection to complete each hole.</li>
              </ul>
              <p>
              Participants who drive to the course are encouraged to park in P-11 or other officially designated university parking spaces.  Vehicles will not be permitted to park alongside Meadowbrook Road or in the grassy area around the filed event space.
              </p>
              <p>You can print the <a href='https://oakland.edu/Assets/Oakland/recwell/files-and-documents/RAOC/GrizzlyOaksScoreCard.pdf'>Scorecard</a></p>

              <h1>Walking/Running Routes</h1>
              <p>
                This <a href="https://oakland.edu/Assets/Oakland/recwell/graphics/route-2.3mile.jpg">2.3-mile</a> route around Oakland University’s main campus is paved and includes rolling hills.
                <br /> 
                <ul>
                  <li>Beginning at the Rec Center, go north alongside Pioneer Drive</li>
                  <li>Turn left at Ravine Drive</li>
                  <li>Turn left at Meadow Brook Road and go past the residence halls, Graham Health Center and through the circle drive in front of Kresge Library until you get to Pioneer Drive</li>
                  <li>Turn left at Pioneer Drive and take that back to the Rec Center</li>
                </ul>
              </p>
              <p>
                This <a href="https://oakland.edu/Assets/Oakland/recwell/graphics/route-4.3mile.jpg">4.3-mile</a> route includes rolling hills and is paved with a small portion consisting of a trail through the woods.
                <br /> 
                <ul>
                  <li>From the Rec Center, head north toward the Upper Fields alongside Pioneer Drive and continue going straight on to Pavilion Road when you get to Ravine Drive</li>
                  <li>Near the entrance to the parking lot for the Sports Dome, there will be a trail through the woods on your left. Follow that trail past the back entrance of Meadow Brook Music Festival</li>
                  <li>Turn right at Mansion Drive and go past Meadow Brook Hall</li>
                  <li>Cut through the gate and go past the Carriage House of Meadow Brook Hall to Golf View Lane, then go past Shotwell-Gustafson Pavilion</li>
                  <li>Veer left toward the president’s house and Meadow Brook Road</li>
                  <li>Turn left at Meadow Brook Road and follow that road past the Meadow Brook Music Festival main entrance, student apartments and residence halls, Graham Health Center, and through the circle drive in front of Kresge Library until you get to Pioneer Drive</li>
                  <li>Turn left at Pioneer Drive and follow that back to the Rec Center</li>
                </ul>
              </p>
              <p>
                This <a href="https://oakland.edu/Assets/upload/docs/Rec/6.5Trail.pdf">6.5-mile</a> route includes rolling hills and is paved with a small portion consisting of a trail through the woods.<br /> 
                <ul>
                  <li>Beginning at the Rec Center, do the 2.2-mile loop around the main campus by going north alongside Pioneer Drive; turning left at Ravine Drive; turning left at Meadow Brook Road and going past the residence halls, Graham Health Center and through the circle drive in front of Kresge Library until you get to Pioneer Drive; turn left at Pioneer Drive and follow that back to the Rec Center</li>
                  <li>At the end of the 2.2-mile loop, you will go past the Rec Center and instead of turning left on Ravine Drive, you will continue straight on Pavilion Road toward east campus</li>
                  <li>Near the entrance to the parking lot for the Sports Dome, there will be a trail through the woods on your left. Follow that trail past the back entrance of Meadow Brook Music Festival</li>
                  <li>Turn right at Mansion Drive and go past Meadow Brook Hall</li>
                  <li>Cut through the gate and go past the Carriage House of Meadow Brook Hall to Golf View Lane, then go past Shotwell-Gustafson Pavilion</li>
                  <li>Veer left toward the president’s house and Meadow Brook Road</li>
                  <li>Turn left at Meadow Brook Road and follow that road past the Meadow Brook Music Festival main entrance, student apartments and residence halls, Graham Health Center, and through the circle drive in front of Kresge Library until you get to Pioneer Drive</li>
                  <li>Turn left at Pioneer Drive and follow that back to the Rec Center</li>
                </ul>
              </p>

              <br />
          </Container>
          <br />
        </div>
    )
}

export default OutdoorComplex