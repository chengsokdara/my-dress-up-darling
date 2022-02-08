import type { FC } from 'react'
import { useState } from 'react'
import { Button } from 'src/shared/components/Button'
import { Col } from 'src/shared/components/Layout'
import { Text } from 'src/shared/components/Text'
import styled, { useTheme } from 'src/styled'

export interface IExpandableTextProps {
  line?: number
}

export const ExpandableText: FC<IExpandableTextProps> = ({
  line,
  children,
  ...rest
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const theme = useTheme()

  return (
    <Content>
      <TextStyled
        ellipsizeMode="tail"
        numberOfLines={!expanded ? line : undefined}
        size={14}
        onPress={() => setExpanded(!expanded)}
        {...rest}>
        {children}
      </TextStyled>
      <Button
        textColor={theme.colors.textInfo}
        height={20}
        textSize={14}
        onPress={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Synopsis' : 'Read Synopsis'}
      </Button>
    </Content>
  )
}

const Content = styled(Col)`
  align-items: flex-end;
`

const TextStyled = styled(Text)`
  padding: 5px 0;
  text-align: center;
  width: 100%;
`
