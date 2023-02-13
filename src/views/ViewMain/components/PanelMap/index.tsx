import { MapTemplateProvider } from '@components/Map'
// import { Circle, Clusterer, Map, Placemark, withYMaps, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import { ePanelIds } from '@src/shared/enums'
import { iPerson } from '@src/shared/types'
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { FC, useState } from 'react'
import { Circle, Clusterer, Map, Placemark, withYMaps, YMaps, ZoomControl } from 'react-yandex-maps'
import { iPanelMapProps } from '../types'
import './index.css'

const getLayout = (name: string, photo: string | undefined) =>
  `<div id="placemark">
    text
  </div>`

// @ts-ignore
const ConnectedTemplateProvider = withYMaps(MapTemplateProvider, true, ['templateLayoutFactory'])

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
  const [ymaps, setYmaps] = useState<any>()
  // const [layout, setLayout] = useState<any>()

  const onPlacemarkClick = (person: iPerson) => {
    let searchPersonToSet = `${person.name} ${person.surname}`
    setActivePanel(ePanelIds.People)
    setPeopleFilter(null)
    setPeopleSearch(searchPersonToSet)
    setIsPeopleCardsCollapsed(false)
  }

  return (
    <Panel className="panel-map" {...rest}>
      <PanelHeader separator={true} before={<PanelHeaderBack onClick={goHome} />}>
        Карта отряда
      </PanelHeader>
      <YMaps>
        {/* @ts-ignore */}
        <ConnectedTemplateProvider>
          {/* @ts-ignore */}
          {({ template, iconTemplate, iconShape }) => (
            <Map
              height="inherit"
              width="inherit"
              defaultState={{ center: [55.75, 37.57], zoom: 4 }}
              // onLoad={(ymaps) => {
              //   setYmaps(ymaps)
              //   // setLayout(
              //   //   ymaps.templateLayoutFactory.createClass(
              //   //     `<div style="color: #000"><button>MARKER</button></div>`
              //   //   )
              //   // )
              //   console.log(ymaps)
              // }}
            >
              {maps &&
                maps.map((map) => (
                  <Circle
                    key={map.title}
                    geometry={[map.coord, 400 * map.radius]}
                    options={{
                      draggable: false,
                      fillColor: '#4D4DFF',
                      fillOpacity: 0.1,
                      strokeColor: '#242444',
                      strokeOpacity: 0.3,
                      strokeWidth: 1,
                    }}
                  />
                ))}
              <Clusterer
                options={{
                  preset: 'islands#nightDotIcon',
                  groupByCoordinates: false,
                }}
              >
                {persons &&
                  persons
                    .filter((person) => person.location_coord)
                    .map((person, personIndex) => (
                      <Placemark
                        onClick={() => onPlacemarkClick(person)}
                        key={personIndex}
                        defaultGeometry={person.location_coord}
                        options={{
                          iconLayout: iconTemplate,
                          iconShape: {
                            type: 'Rectangle',
                            coordinates: iconShape,
                          },
                        }}
                        // defaultOptions={{
                        //   iconLayout: getLayout(person.name, person.photo) || 'default#image',
                        //   // iconLayout: 'default#image',
                        //   iconImageHref: person.photo,
                        //   iconImageSize: [30, 30],
                        //   // iconShape: { type: 'Rectangle' },
                        // }}
                        defaultProperties={{
                          iconCaption: `${person.name} ${person.surname}`,
                        }}
                      />
                    ))}
              </Clusterer>

              <ZoomControl options={{}} />
            </Map>
          )}
        </ConnectedTemplateProvider>
      </YMaps>
    </Panel>
  )
}
