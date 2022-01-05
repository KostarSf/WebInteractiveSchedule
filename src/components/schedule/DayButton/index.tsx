import { FunctionComponent } from "react"


export interface DayData {
    id: number,
    name: string,
}

type Props = {
    data: DayData
}

export const DayButton:FunctionComponent<Props> = ({data}) => {
    return (
        <div></div>
    )
}
