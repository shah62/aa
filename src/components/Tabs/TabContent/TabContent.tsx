import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { ReactNode } from 'react';

export interface TabContentProps extends Tabs.TabsContentProps {}

class TabContent extends React.Component<TabContentProps> {
	constructor(props: TabContentProps) {
		super(props);
	}

	render(): ReactNode {
		return <Tabs.TabsContent {...this.props} />;
	}
}

export default TabContent;
