import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { TRow } from "../stats/ReadingStats";

export function SkeletonReadingStatTable() {

    return (
        <SkeletonTheme enableAnimation={false}>
            <tbody>
                {Array(6)
                    .fill()
                    .map((item, index) => 
                        <TRow key={index} style={{width: "100%"}}>
                                {Array(3)
                                    .fill()
                                    .map((item, index) =>
                                        <td key={index}>
                                            <Skeleton baseColor="none"/>
                                        </td>
                                    )
                                }
                        </TRow>
                    )
                }
            </tbody>
        </SkeletonTheme>
    )
}