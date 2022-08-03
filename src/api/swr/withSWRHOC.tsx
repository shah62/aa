import useSWR, { Key, SWRConfiguration, SWRResponse } from 'swr';
import React from 'react';

export interface WithUseSWRHOCProps<TData = unknown, TError = unknown> {
	queryData: SWRResponse<TData, TError>;
}

interface WithUseSWRHOCOptions<TData, TError> {
	key: string;
	queryFn: () => Promise<TData>;
	options?: SWRConfiguration<TData, TError>;
}

const withSWRHOC =
	<
		TData,
		TError,
		TProps extends WithUseSWRHOCProps<TData, TError> = WithUseSWRHOCProps<
			TData,
			TError
		>
	>(
		options:
			| WithUseSWRHOCOptions<TData, TError>
			| ((
					props: Omit<TProps, keyof WithUseSWRHOCProps>
			  ) => WithUseSWRHOCOptions<TData, TError>)
	) =>
	(Component: React.ComponentType<TProps>) => {
		const displayName = Component.displayName || Component.name || 'Component';

		const ComponentWithSWR = (
			props: Omit<TProps, keyof WithUseSWRHOCProps>
		) => {
			const queryOptions =
				typeof options === 'function' ? options(props) : options;

			const queryData = useSWR(
				queryOptions.key,
				queryOptions.queryFn,
				queryOptions.options
			);

			return <Component {...(props as TProps)} queryData={queryData} />;
		};

		ComponentWithSWR.displayName = `withUseSWR(${displayName})`;

		return ComponentWithSWR;
	};

export default withSWRHOC;
