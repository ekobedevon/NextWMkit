import { NextPage } from 'next'

interface Props {
    Icon: string
    className?: string
}

import {
    GiBarbarian,
    GiBarbute,
    GiBrutalHelm,
    GiCowled,
    GiCultist,
    GiDiabloSkull,
    GiVampireDracula,
    Gi3DGlasses,
    GiDragonHead,
    GiDwarfFace,
    GiDwarfHelmet,
    GiDwarfKing,
    GiElfHelmet,
    GiExecutionerHood,
    GiWomanElfFace,
    GiFishMonster,
    GiGoblinHead,
    GiGolemHead,
    GiKenkuHead,
    GiMonkFace,
    GiNunFace,
    GiOgre,
    GiOrcHead,
    GiOverlordHelm,
    GiTroll,
    GiRestingVampire,
    GiVisoredHelm,
    GiWarlockHood,
    GiWizardFace,
} from 'react-icons/gi'

function RenderIcon({Icon}:{Icon:string}) {
  switch (Icon) {
    case 'GiBarbarian':
      return <GiBarbarian />;
    case 'GiBarbute':
      return <GiBarbute />;
    case 'GiBrutalHelm':
      return <GiBrutalHelm />;
    case 'GiCowled':
      return <GiCowled />;
    case 'GiCultist':
      return <GiCultist />;
    case 'GiDiabloSkull':
      return <GiDiabloSkull />;
    case 'GiVampireDracula':
      return <GiVampireDracula />;
    case 'Gi3DGlasses':
      return <Gi3DGlasses />;
    case 'GiDragonHead':
      return <GiDragonHead />;
    case 'GiDwarfFace':
      return <GiDwarfFace />;
    case 'GiDwarfHelmet':
      return <GiDwarfHelmet />;
    case 'GiDwarfKing':
      return <GiDwarfKing />;
    case 'GiElfHelmet':
      return <GiElfHelmet />;
    case 'GiExecutionerHood':
      return <GiExecutionerHood />;
    case 'GiWomanElfFace':
      return <GiWomanElfFace />;
    case 'GiFishMonster':
      return <GiFishMonster />;
    case 'GiGoblinHead':
      return <GiGoblinHead />;
    case 'GiGolemHead':
      return <GiGolemHead />;
    case 'GiKenkuHead':
      return <GiKenkuHead />;
    case 'GiMonkFace':
      return <GiMonkFace />;
    case 'GiNunFace':
      return <GiNunFace />;
    case 'GiOgre':
      return <GiOgre />;
    case 'GiOrcHead':
      return <GiOrcHead />;
    case 'GiOverlordHelm':
      return <GiOverlordHelm />;
    case 'GiTroll':
      return <GiTroll />;
    case 'GiRestingVampire':
      return <GiRestingVampire />;
    case 'GiVisoredHelm':
      return <GiVisoredHelm />;
    case 'GiWarlockHood':
      return <GiWarlockHood />;
    case 'GiWizardFace':
      return <GiWizardFace />;
    default:
      // Handle the case when no matching component is found
      return <GiCowled />;
  }
}


const UserIcon: NextPage<Props> = ({ Icon, className }) => {
    
	
	
	
	
	return (
		
		<div className={className}>
			<RenderIcon Icon={Icon}/>
		</div>

        // <img
        //     src={`/UserIcons/${Icon}`}
        //     alt={`${Icon} user icon`}
        //     className={className || 'w-auto h-8'}
        // />
    )
}

export default UserIcon
