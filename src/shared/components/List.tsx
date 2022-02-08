import { ForwardedRef, forwardRef } from 'react'
import type { FlatListProps, SectionListProps } from 'react-native'
import {
  FlatList as RNFlatList,
  Image as RNImage,
  SectionList as RNSectionList,
  StyleSheet,
} from 'react-native'
import { EFontWeight } from 'src/constants/enums'
import { Center } from 'src/shared/components/Layout'
import { Text } from 'src/shared/components/Text'
import styled from 'src/styled'

export const List = forwardRef(
  (
    { style, ...rest }: FlatListProps<any>,
    ref: ForwardedRef<RNFlatList<any>>,
  ) => {
    return (
      <RNFlatList
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          rest.refreshing ? (
            <Center stretch>
              <Text p={10} size={20} weight={EFontWeight.Bold}>
                Please wait 😜
              </Text>
              <RNImage source={require('src/assets/images/booing.webp')} />
              <Text p={10} size={20} weight={EFontWeight.Bold}>
                Downloading...
              </Text>
            </Center>
          ) : (
            <Center stretch>
              <Text style={styles.emptyText}>No Data</Text>
            </Center>
          )
        }
        keyExtractor={item => item.uid}
        {...rest}
        ref={ref}
        contentContainerStyle={[styles.contentContainer, style]}
      />
    )
  },
)

export const SectionList = forwardRef(
  (
    { style, ...rest }: SectionListProps<any>,
    ref: ForwardedRef<RNSectionList<any>>,
  ) => {
    return (
      <RNSectionList
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          rest.refreshing ? (
            <Center stretch>
              <Text p={10} size={20} weight={EFontWeight.Bold}>
                Please wait 😜
              </Text>
              <RNImage source={require('src/assets/images/booing.webp')} />
              <Text p={10} size={20} weight={EFontWeight.Bold}>
                Downloading...
              </Text>
            </Center>
          ) : (
            <Center stretch>
              <Text style={styles.emptyText}>No Data</Text>
            </Center>
          )
        }
        keyExtractor={item => item.uid}
        {...rest}
        ref={ref}
        contentContainerStyle={[styles.contentContainer, style]}
      />
    )
  },
)

const Separator = styled.View`
  height: 10px;
`

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  emptyText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})
