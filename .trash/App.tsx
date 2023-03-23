const Example = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState('profile');
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
  const isVKCOM = platform !== Platform.VKCOM;

  return (
    <SplitLayout
      header={isVKCOM && <PanelHeader separator={false} />}
      style={{ justifyContent: 'center' }}
    >
      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'feed'}
                  data-story="feed"
                  text="Новости"
                >
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'services'}
                  data-story="services"
                  text="Сервисы"
                >
                  <Icon28ServicesOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'messages'}
                  data-story="messages"
                  indicator={
                    <Counter size="s" mode="prominent">
                      12
                    </Counter>
                  }
                  text="Сообщения"
                >
                  <Icon28MessageOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'clips'}
                  data-story="clips"
                  text="Клипы"
                >
                  <Icon28ClipOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'profile'}
                  data-story="profile"
                  indicator={<Badge mode="prominent" />}
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          <View id="feed" activePanel="feed">
            <Panel id="feed">
              <PanelHeader before={<PanelHeaderBack />}>Новости</PanelHeader>
              <Group style={{ height: '1000px' }}>
                <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} />
              </Group>
            </Panel>
          </View>
          <View id="services" activePanel="services">
            <Panel id="services">
              <PanelHeader before={<PanelHeaderBack />}>Сервисы</PanelHeader>
              <Group style={{ height: '1000px' }}>
                <Placeholder icon={<Icon28ServicesOutline width={56} height={56} />}></Placeholder>
              </Group>
            </Panel>
          </View>
          <View id="messages" activePanel="messages">
            <Panel id="messages">
              <PanelHeader before={<PanelHeaderBack />}>Сообщения</PanelHeader>
              <Group style={{ height: '1000px' }}>
                <Placeholder icon={<Icon28MessageOutline width={56} height={56} />}></Placeholder>
              </Group>
            </Panel>
          </View>
          <View id="clips" activePanel="clips">
            <Panel id="clips">
              <PanelHeader before={<PanelHeaderBack />}>Клипы</PanelHeader>
              <Group style={{ height: '1000px' }}>
                <Placeholder icon={<Icon28ClipOutline width={56} height={56} />}></Placeholder>
              </Group>
            </Panel>
          </View>
          <View id="profile" activePanel="profile">
            <Panel id="profile">
              <PanelHeader before={<PanelHeaderBack />}>Профиль</PanelHeader>
              <Group style={{ height: '1000px' }}>
                <Placeholder
                  icon={<Icon28UserCircleOutline width={56} height={56} />}
                ></Placeholder>
              </Group>
            </Panel>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

<Example />;