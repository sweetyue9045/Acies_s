import '../style/Team.css';

import PHOTO_01 from '../assets/images/team_photo_01.png';
import PHOTO_02 from '../assets/images/team_photo_02.png';
import PHOTO_03 from '../assets/images/team_photo_03.png';
import PHOTO_04 from '../assets/images/team_photo_04.png';
import PHOTO_05 from '../assets/images/team_photo_05.png';
import PHOTO_06 from '../assets/images/team_photo_06.svg';

import Title from '../components/Title';

const teamMembers = {
  gameDevelopers: [
    { src: PHOTO_01, name: '鄭仴筑', role: '程式' },
    { src: PHOTO_02, name: '洪欣儀', role: '程式、企劃' },
    { src: PHOTO_03, name: '林于楨', role: '美術、動畫' },
    { src: PHOTO_04, name: '王怡文', role: '美術、動畫' },
  ],
  webDevelopers: [
    { src: PHOTO_05, name: '吳孟儒', role: '程式' },
    { src: PHOTO_02, name: '洪欣儀', role: '程式' },
    { src: PHOTO_03, name: '林于楨', role: '主視覺' },
    { src: PHOTO_06, name: '' }, 
  ],
};


const renderMembers = (members) => (
  members.map((member, index) => (
    <div key={index} className="team-member">
      <img src={member.src} alt={`Team member ${index}`} />
      {member.name && <p>{member.name}</p>}
      {member.role && <p>{member.role}</p>}
    </div>
  ))
);

const Team = () => (
  <div className="team">
    <div className="team-group">
      <Title mainTitle="遊戲開發團隊" subTitle="GAME DEVELOPER" ls="16" lss="10.5" />
      <div className="team-members">
        {renderMembers(teamMembers.gameDevelopers)}
      </div>
    </div>
    <div className="team-group">
      <Title mainTitle="網站開發團隊" subTitle="WEB DEVELOPER" ls="18" lss="12" />
      <div className="team-members">
        {renderMembers(teamMembers.webDevelopers)}
      </div>
    </div>
  </div>
);

export default Team;
