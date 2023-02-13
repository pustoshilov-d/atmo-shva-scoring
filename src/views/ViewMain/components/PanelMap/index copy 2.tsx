
import { ePanelIds } from '@src/shared/enums'
import { iPerson } from '@src/shared/types'
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { FC } from 'react'
import { iPanelMapProps } from '../types'
import './index.css'
// @ts-ignore 
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

export const PanelMap: FC<iPanelMapProps> = ({
  setActivePanel,
  goHome,
  setActiveModal,
  setPeopleFilter,
  setIsPeopleCardsCollapsed,
  setPeopleSearch,
  persons,
  maps,
  fetchedUser,
  ...rest
}) => {
  const onPlacemarkClick = (person: iPerson) => {
    let searchPersonToSet = `${person.name} ${person.surname}`
    setActivePanel(ePanelIds.People)
    setPeopleFilter(null)
    setPeopleSearch(searchPersonToSet)
    setIsPeopleCardsCollapsed(false)
  }
  const markerStyles = {
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    border: '1px solid orange',
    background: '#FFF',
    borderRadius: '50%'
};

const mapState = {
  controls: ['default']
};

  return (
    <Panel className="panel-map" {...rest}>
      <PanelHeader separator={true} before={<PanelHeaderBack onClick={goHome} />}>
        Карта отряда
      </PanelHeader>
      <Map onAPIAvailable={function () { console.log('API loaded'); }}  height="inherit" width="inherit" state={mapState} center={[55.754734, 37.583314]} zoom={10}>
        {persons.filter((person) => person.location_coord).map((person, i) =>  (
            <Marker key={'marker_' + i} lat={person.location_coord[0]} lon={person.location_coord[1]}>
                <MarkerLayout>
                    <div style={markerStyles}>
                        <img src={person.photo}/>
                    </div>
                </MarkerLayout>
            </Marker>
        ))}
    </Map>,
    </Panel>
  )
}
