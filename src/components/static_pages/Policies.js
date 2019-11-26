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

const Policies = () => {
    const classes = useStyles()
    return(
      <div className={classes.background}>
      <br />
        <Container maxWidth="md" className={classes.cont}>
          <br />
          <img src="https://oakland.edu/Assets/Oakland/recwell/graphics/sub-page-banners/REC-13599_Policies.jpg" 
            alt="image" className={classes.imagecenter}></img>
          <hr />
          <h1>General</h1>
          <ul>
            <li>Proper identification (valid OU GrizzCard) must be shown when entering the building. Rec Well staff reserve the right to ask for additional forms of identification at any time. Members who have forgotten their GrizzCard will be charged the guest fee.</li>
            <li>Food and drink are restricted to the social lounge, and Lobby&nbsp;areas of the facility and are not permitted in any of the recreational areas of the building. Glass containers are not permitted in the natatorium, locker rooms or other recreational areas.</li>
            <li>Smoking and smokeless tobacco are not permitted, OU is a smoke-free campus.</li>
            <li>Alcohol and drug use is strictly prohibited in any Rec Well facility or program. Violators will be subject to OU disciplinary procedures.</li>
            <li>Proper recreational attire must be worn at all times, no pants or shirts with zippers or catches will be permitted. On areas with wood floors, close attention is paid to footwear. Street shoes or any shoes suspected of marking the floors will not be permitted.</li>
            <li>Profanity and abusive language will not be tolerated.</li>
            <li>Sexual or ethnic harassment of patrons and/or employees will be handled through the OU disciplinary and legal systems.</li>
            <li>Martial arts weapons are prohibited in the Rec Center. Contact sparring may occur only on a scheduled activity basis.</li>
            <li>Use of any Rec Well facility for personal or monetary gain is not permitted.</li>
            <li>Rec Well and the University are not responsible for lost or stolen items. Please leave valuables home or be sure to lock them securely.</li>
            <li>Use of these facilities is considered a privilege.</li>
          </ul>
          <p><i>Individuals not complying with the established departmental policies and procedures may be asked to leave the facility and/or be subject to departmental and/or university disciplinary procedures.</i></p>
          <br />
          <h1>Fitness Center</h1>
          <h3>Attire</h3>
          <ul>
            <li>Athletic tops and tanks that cover the torso, including the midriff and rib cage. Wearing only bra tops or sports bras while working out is prohibited.</li>
            <li>Athletic bottoms must be worn. Jeans, cargo shorts, carpenter-style pants or clothing with exposed rivets, buttons, zippers, or other metal parts are not permitted.</li>
            <li>Soft-soled, closed-toed athletic shoes must be worn. NO sandals, open-toed shoes, construction boots, flip flops, boat shoes (Sperry’s), or flats (Tom’s, etc.) are allowed in the Fitness Center.</li>
          </ul>
          <h3>Usage Policies</h3>
          <ul>
            <li>Participants must be at least 13 years of age or older to use or be in the Fitness Center; however they must be under the supervision and accompanied by an adult at all times.</li>
            <ul>
              <li>Between ages 13-17, they can complete the TGIF Program (Teens Getting into Fitness) to learn more about fitness and proper use of the Fitness Center and its equipment.</li>
            </ul>
            
            <li>Personal Training is prohibited unless conducted by University RecWell&nbsp;employees.</li>
            <li>Club or Athletic Teams are not allowed to conduct scheduled workouts in the Fitness Center.</li>
            <li>Patrons must comply with decisions made by Rec Center&nbsp;employees.</li>
            <li>Photos and videos are permitted in the Fitness Center for personal non-commercial and lawful use provided that the individuals within the photo/video have given permission.</li>
            <ul>
              <li>By entering the facility, you consent to being the subject of any photography, audio, or video recordings that may take place while you are participating in programming or other open recreational activities. Such media may be used for publications, advertising, and other promotional or marketing purposes. If you do not wish to be photographed, please kindly inform the photographer or videographer.</li>
            </ul>
          </ul>
          <h3>Beverages, Personal Belongings, & Music</h3>
          <ul>
            <li>All beverages must be in a closed container. Food, tobacco products, or open beverage containers are prohibited within the Fitness Center.</li>
            <li>Personal belongings not being used or worn must be kept off of the workout floor - preferably in a locker (i.e. book bags, sweatshirts, jackets, etc.).</li>
            <li>University Recreation and Well-Being&nbsp;is not responsible for lost or stolen items not secured in a locker.</li>
            <li>Fitness Assistants are not allowed to keep patron’s personal items for them behind the Fitness Desk; please do not ask them to do so.</li>
            <li>Participants may only use personal listening devices and volume must be at a respectable volume.</li>
          </ul>
          <h3>Equipment Policies</h3>
          <ul>
            <li>All equipment must be used in the manner for which it is designed.</li>
            <li>Immediately report any facility related injuries or equipment irregularity to the Fitness Assistant or Building Manager on duty.</li>
            <li>Fitness Center Orientations are recommended for all individuals not familiar with the exercise equipment. Improper technique during exercise can cause injury or undue soreness. Fitness Assistants are trained on proper form and technique with all equipment in the Fitness Center. Walk-In orientations are available during all hours of operation and are to be performed upon the request of a patron by the Fitness Assistant on duty.</li>
            <li>Cardiovascular machine use is limited to 30 minutes when the Fitness Center is busy.</li>
            <li>Taking the equipment out of the Fitness Center is allowed but must be returned. If equipment is continuously not returned, then it will not be allowed outside of the Fitness Center.</li>
            <li>Spotters are recommended for free weight exercises.</li>
            <li>Chalk or other aids that leave residue are not permitted. Weight gloves and straps are permitted.</li>
            <li>Additional equipment (TRX suspension trainers, resistance bands, weight belts, Bosu trainers, boxing gloves, etc.) are available for checkout at the member services desk. Patrons must follow all procedures and return equipment back to the the service desk following usage to avoid any charge.</li>
            <li>Dumbbells &amp; Plate Weights</li>
            <ul>
              <li>Clips/collars must be used during all lifts using plate weight and bars.</li>
              <li>All dumbbells/weights must be re-racked after use. Space is very limited and thus disorganized equipment can cause clutter and made an unsafe environment for other facility users.</li>
              <li>DO NOT leave weight plates resting on the walls, this can lead to damage.</li>
              <li>DO NOT drop dumbbells or other free weight equipment at any time. If they become too damaged, we may have to remove them from the Fitness Center with no guarantee of replacement.</li>
              <li>Only rubber weights can be taken outside of the free weight area.</li>
              <li>No slamming the medicine balls or any other form of equipment within the Fitness Center.</li>
            </ul>
            <li>Olympic Bars &amp; Bumper Plates</li>
            <ul>
              <li>Olympic bars can only be used within the squat rack and bench press equipment. Taking the bars out of the designated platform or squat rack area is dangerous and prohibited.</li>
              <li>Olympics lifts are prohibited with the metal weight plates and can only be performed using bumper plates on the two Olympic lifting platforms.</li>
            </ul>
          </ul>
          <br />
          <h1>Indoor Track Rules</h1>
          <ul>
            <li>Please observe posted running direction signage: M-W-F-Sun clockwise; T-R-Sat counter clockwise.</li>
            <li>Please no food or drink on the track (water in plastic water bottles is ok).</li>
            <li>Walkers and slower runners should keep to the inside lanes.</li>
            <li>When possible, pass in an outside lane.</li>
            <li>Shirts must be worn at all times.</li>
            <li>Shoes are required at all times.</li>
            <li>Please no spitting on the track, ledge or carpeted area.</li>
            <li>In general, strollers are not permitted on the Track. During low use times exceptions can be requested of the Professional Staff.</li>
            <li>Children must be accompanied by an adult.</li>
            <li>Spikes or cleats are not permitted.</li>
            <li>Patrons must comply with decisions made by OU RecWell&nbsp;employees.</li>
            <li>No Spectators on Track.</li>
          </ul>
          <br />
          <h1>Aquatic Center</h1>
          <h3>General</h3>
          <ul>
            <li>Swim only when a lifeguard is on duty.</li>
            <li>Appropriate commercially bought swim attire required; swimwear should be clean.</li>
            <li>Persons with infectious or communicable diseases are prohibited from using the pool or spa.</li>
            <li>Please refrain from spitting in or polluting the water.</li>
            <li>Diving from the deck is permitted in deep water area only (9 ft or greater).</li>
            <li>No running, horseplay, or disruptive behavior allowed.</li>
            <li>Glass, sharp plastics items, and other breakable items are not permitted.</li>
            <li>Food, gum or beverages are prohibited. Plastic water containers are allowed.</li>
            <li>Only Type II Coast Guard Approved flotation devices or lifejackets are allowed.</li>
            <li>Use of starting blocks is for supervised competitive practice/meets; use by recreational swimmers is not permitted.</li>
            <li>Please refrain from placing objects in the pool gutter.</li>
            <li>Please refrain from hanging on the lane lines.</li>
            <li>No swimming underneath the bulkhead.</li>
            <li>Pool toys must be approved by the aquatic staff.</li>
            <li>Children wearing diapers, including swim diapers, must also wear tightly fitted plastic pants.</li>
            <li>Street shoes should be removed prior to entering the Aquatic Center.</li>
            <li>Moving of aquatic equipment, including the movable bulkheads, should not occur without aquatic staff permission and/or direct supervision.</li>
            <li>Pets, except for trained service animals, are not allowed in the Aquatic Center.</li>
            <li>Patrons must comply with the decisions made by OU RecWell&nbsp;employees.</li>
          </ul>
          <h3>Diving Board</h3>
          <ul>
            <li>Recreational Use diving is permitted on one 1-Meter diving board during Recreation Swim time with the permission of the lifeguard staff.</li>
            <li>The Diving Tower and 3-Meter Diving Boards are not available for Recreation Use.</li>
            <li>Children under 16 years old must be able to swim the width of the diving well before using the boards. An aquatic center staff member may ask the youngster to demonstrate the skill if they are concerned for the safety of the individual.&nbsp;</li>
            <li>One person on the diving boards at a time.</li>
            <li>Only one bounce per dive.</li>
            <li>Dive straight from the end of the board only.</li>
            <li>After diving, swim to the nearest ladder and climb out; do not swim under the board.</li>
            <li>No hanging on the end of the board at any time.</li>
          </ul>
          <h3>Spa</h3>
          <i>Please see additional rules on the sign located by the spa.</i>
          <ul>
            <li>Elderly persons, pregnant women, infants and those with health conditions requiring medical care should consult with a physician before entering the spa.</li>
            <li>Hot water immersion while under the influence of alcohol, narcotics, drugs, or medicines may lead to serious consequences and is not recommended</li>
            <li>Long exposure may result in nausea, dizziness or fainting.</li>
          </ul>
          <h1>Gyms</h1>
          <h3>Gym Rules</h3>
          <ul>
            <li>Only non-marking shoes should be worn on all wood floors.</li>
            <li>Hanging from or snapping the basketball rims is prohibited. Dunking is permitted during open recreation or intramural game play.</li>
            <li>Please no food or drink permitted, water in a closed container is acceptable.</li>
            <li>Football, soccer, baseball, lacrosse, frisbee or softball are not permitted except with special permission of University Recreation and Well-Being&nbsp;staff. <em>Soccer is permissible in the Activity Center.</em></li>
            <li>Proper footwear is required in all activity areas.</li>
            <li>Personal items not being worn or used (bags, clothes, etc.) may be kept on the bleachers or in a locker, not on the gymnasium floor.</li>
            <li>Shirts must be worn at all times.</li>
            <li>Music is restricted to the building background music and personal listening devices.</li>
            <li>Patrons must abide by decisions made by University RecWell&nbsp;employees.</li>
          </ul>
          <h3>Racquetball Courts</h3>
          <ul>
            <li>Court reservations may be made 24 hours in advance at the Service Desk or by calling (248) 370-4514.</li>
            <li>Same day reservations will be accepted as long as there are available courts. Reservations are one hour in duration and are taken on the hour. Forfeit times are 10 minutes past the hour. Reservations may be cancelled up until an hour before the scheduled use time. When making a wallyball reservation, please indicate as such.</li>
            <li>Please use non-marking athletic shoes. Street shoes, running shoes, or any shoes suspected of marking or damaging the floors are not permitted.</li>
            <li>Shirts must be worn at all times.</li>
            <li>Absolutely no food or drink permitted inside the courts.</li>
            <li>Protective eye-wear is strongly recommended.</li>
            <li>Racquet safety straps and bumper guards are strongly recommended.</li>
            <li>Patrons may furnish their own racquets however, there are racquets available for daily rentals at the Service Desk. Patrons are responsible for the condition of the racquet upon its return and any patron doing damage to a racquet will have to make appropriate restitution.</li>
            <li>Personal items not being worn or used (i.e. bags, clothes, etc.) are not permitted inside the courts.</li>
          </ul>
          <br />
          <h1>Studios/Fitness Annex</h1>
          <h3>GroupX Class Policies</h3>
          <ul>
            <li>All participants must check-in with the Member Services Desk or Welcome Center prior to class start time, receive a number, and present their number to the instructor upon entering the class.</li>
            <li>Fitness classes are available on a first-come, first-served basis. If you are more than 5 minutes late for any fitness class, it is up to the instructor to allow you to participate in class.</li>
            <li>Participants are requested not to leave class early. If you plan to leave early, please let the instructor know before class and please take time to cool down on your own time. If during class you aren’t feeling well, please alert the instructor and they will call the Building Manager to assist.</li>
            <li>Class Cancellation Policies: If one or zero individual(s) show up for a class it will be cancelled. If two individuals show, the instructor has the authority to decide to run a half-time class or full class. If three or more individuals show, the class will run its normal length.</li>
            <li>All group exercise classes are subject to cancellation for University Holidays, emergencies, or weather restrictions.</li>
          </ul>
          <h3>Studio 897 & 919 Policies</h3>
          <ul>
            <li>Proper footwear is required during fitness classes. Proper footwear includes athletic supportive shoes only. All athletic shoes must be non-marking soles. Proper athletic shoes required for all group exercise except for Mind/Body, Barre, and Aqua classes.</li>
            <li>Workout attire must fully cover the midsection and shirts and/or sporting tops cannot be removed. Bottoms must be an acceptable length, and no skirts or dresses are permitted. Instructors reserve the right to enforce clothing policies within the studio.</li>
            <li>Participants are asked to disinfect and put away all equipment and mats at the completion of class. No cell phones, iPods, laptops, or other distracting devices allowed during class. The instructor has the right to enforce this policy if a device is interrupting with class.</li>
            <li>Water, in a closed container, is the only beverage allowed in the studio unless permissible by professional staff.</li>
            <li>Other personal belongings that are not being used or worn during class must be kept outside the studios in a locker. University Recreation and Well-Being&nbsp;is not responsible for lost or damaged items.</li>
          </ul>
          <h3>Studio 919 Open Rec Policies</h3>
          <ul>
            <li>Studio 919 is available for Recreational Drop-In use when there is not scheduled usage; please consult the posted room schedule.</li>
            <li>Drop-In users should plan to conclude their use 15 minutes prior to any scheduled room usage.</li>
            <li>Proper footwear is required; proper footwear includes athletic supportive shoes only. All athletic shoes must be non-marking soles.</li>
            <li>Studio 919 sound system usage is restricted to University RecWell programs/activities.</li>
            <li>Rec Radio can be turned off by requesting so at the Welcome Center</li>
          </ul>
          <h3>Fitness Annex B (Cycle) Policies</h3>
          <ul>
            <li>Fitness Annex B&nbsp;is available for drop-in use unless reserved for Fitness Programming. Please see the schedule online or outside of the Fitness Annex.</li>
            <li>The Medicine Ball Wall in Fitness Annex A&nbsp;can be utilized when GroupX classes or other reservations are not in session.</li>
            <li>Disinfect your bike and put away all equipment used during the class (mats, med balls, etc.)</li><li>Cycle Class Policies:</li>
            <ul>
              <li>Proper footwear is required during fitness classes. Proper footwear includes athletic supportive shoes only. All athletic shoes must be non-marking soles.</li>
              <li>Participants are requested not to leave class early. If you plan to leave early, please let the instructor know before class and please take time to cool down on your own time. If during class you aren’t feeling well, please alert the instructor and they will call the Building Manager to assist.</li>
              <li>Class Cancellation Policies: If one or zero individual(s) show up for a class it will be cancelled. If two individuals show, the instructor has the authority to decide to run a half-time class or full class. If three or more individuals show, the class will run its normal length.</li>
            </ul>
          </ul>
          <br />
          <h1>Locker Room Rules</h1>
          <ul>
            <li>Please do not leave any valuables or personal items in unlocked lockers or lying around.</li>
            <li>Please close lockers when you are finished.</li>
            <li>Please turn off all showers and close shower curtains after use.</li>
            <li>For the safety and consideration of others, please dry off in the shower area of the locker room. This will keep our changing areas clean, neat and free of water.</li>
            <li>Please refrain from bringing glass bottles into the locker rooms.</li>
            <li>Co-ed use of locker room facilities is limited to parental supervised children age 4 and less.</li>
            <li>Children older than 4 are required to use the appropriate locker room accompanied by a parent or guardian of the same sex.</li>
            <li>Patrons needing assistance through the locker rooms to the Aquatics Center should feel free to contact any member of the Rec Center staff.</li>
          </ul>
          <br />
          <h1>Outdoor Complex</h1>
          <h3>Complex Rules</h3>
          <ul>
            <li>Users must check-in at the Equipment Room Window</li>
            <li>Student, Faculty/Staff, or Membership ID is required to use facility</li>
            <li>No Pets</li>
            <li>Alcohol beverages, smoking, and amplified sound prohibited in and around complex</li>
            <li>No Glass Containers</li>
            <li>Lights: Overhead lights will be on during normal recreation hours that are after dusk; Light will turn off promptly at closing</li>
          </ul>
          <h3>Tennis Court Rules</h3>
          <ul>
            <li>Tennis Courts are for OU Recreation Center Members only</li>
            <li>Courts are for tennis use only (unless special permission granted by University Recreation and Well-Being)</li>
            <li>First come, First Serve unless reserved usage is posted on weekly schedule</li>
            <li>Tennis Shoes must be worn on the Tennis Courts</li>
            <li>No Bikes/Skateboards/In-Line Skates on Tennis Courts</li>
            <li>Please do not abuse/sit on net</li>
            <li>Please do not use tape on the court surface</li>
            <li>Members are not permitted to bring in professional tennis instructor to teach private lessons; University Recreation and Well-Being&nbsp;retains exclusive right to teach lessons and classes</li>
            <li>Management is not responsible for any accidents or injuries while using this facility</li>
          </ul>
          <h3>Track Rules</h3>
          <ul>
            <li>Track is for Recreation Center Member use only</li>
            <li>Track is for Running/Walking only, No In line skates, skateboards, bikes, etc</li>
            <li>Observe Directional and Lane Speed Signage</li>
            <li>Appropriate footwear only; no cleats</li>
            <li>No Gum</li>
            <li>No Food or glass containers</li>
          </ul>
          <h3>Synthetic Turf Rules</h3>
          <ul>
            <li>No Golf Practice</li>
            <li>No Hanging on Goals</li>
            <li>No Sports Drinks, Soda, Coffee or Beverages other than water</li>
            <li>No Glass or Metal Beverage Containers</li>
            <li>No Food.. No Seeds &amp; Nuts. No Gum</li>
            <li>No Marking of lines on Turf with Paint, Tape, etc</li>
            <li>No Moving Goals</li>
            <li>No Tent Stakes</li>
            <li>No Sharp Objects (i.e. Flags penetrating into the Turf, Croquet stakes, etc)</li>
            <li>No Metal Cleats</li>
            <li>No Grilling</li>
            <li>No Bikes, Scooters, Unauthorized Vehicles</li>
          </ul>

          <br />
        </Container>
        <br />
      </div>
    )
}

export default Policies