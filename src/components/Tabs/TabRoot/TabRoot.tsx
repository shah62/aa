import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import TabRootStyles from './TabRoot.module.scss';
import clsx from 'clsx';

interface TabTrigger {
	label: string;
	value: string;
	tabTriggerProps?: Omit<Tabs.TabsTriggerProps, 'value' | 'children'>;
}

export interface TabRootProps {
	tabsRootProps?: Tabs.TabsProps;
	tabsListProps?: Tabs.TabsListProps;
	tabTriggers: TabTrigger[];
	children: React.ReactNode;
}

class TabRoot extends React.Component<TabRootProps> {
	constructor(props: TabRootProps) {
		super(props);
	}

	render(): React.ReactNode {
		return (
			<Tabs.Root
				activationMode='manual'
				{...this.props.tabsRootProps}
				className={clsx(
					TabRootStyles.root,
					this.props.tabsRootProps?.className
				)}
			>
				<Tabs.List
					{...this.props.tabsListProps}
					className={clsx(
						TabRootStyles.list,
						this.props.tabsListProps?.className
					)}
				>
					{this.props.tabTriggers.map(({ value, label, tabTriggerProps }) => {
						return (
							<Tabs.Trigger
								key={`tab-${label}-${value}`}
								{...tabTriggerProps}
								className={clsx(
									TabRootStyles.trigger,
									tabTriggerProps?.className
								)}
								value={value}
							>
								{label}
							</Tabs.Trigger>
						);
					})}
				</Tabs.List>
				{this.props.children}
			</Tabs.Root>
		);
	}
}

export default TabRoot;
