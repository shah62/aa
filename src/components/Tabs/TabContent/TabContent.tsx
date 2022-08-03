import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

export interface TabContentProps extends Tabs.TabsContentProps {}

class TabContent extends React.Component<TabContentProps> {
	constructor(props: TabContentProps) {
		super(props);
	}

	render(): React.ReactNode {
		return <Tabs.TabsContent {...this.props} />;
	}
}

export default TabContent;
