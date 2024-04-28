import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'

import {
    faLock as fasLock,
    faMagnifyingGlass as fasMagnifyingGlass,
    faCrown as fasCrown,
    faUnlock as fasUnlock,
    faPalette as fasPalette,
    faForward as fasForward,
    faArrowRotateLeft as fasArrowRotateLeft,
    faBan as fasBan,
    faArrowLeft as fasArrowLeft,
    faArrowRight as fasArrowRight,
    faDice as fasDice,
    faPiggyBank as fasPiggyBank,
    faHandHoldingDollar as fasHandHoldingDollar,
    faDiceTwo as fasDiceTwo,
    faMoneyBill as fasMoneyBill
} from '@fortawesome/free-solid-svg-icons'

import {
    faCircleQuestion as farCircleQuestion,
} from '@fortawesome/free-regular-svg-icons'

library.add(
    //solid 
    fasLock,
    fasMagnifyingGlass,
    fasCrown,
    fasUnlock,
    fasPalette,
    fasForward,
    fasArrowRotateLeft,
    fasBan,
    fasArrowLeft,
    fasArrowRight,
    farCircleQuestion,
    fasDice,
    fasPiggyBank,
    fasHandHoldingDollar,
    fasDiceTwo,
    fasMoneyBill
)

export default function({icon, variant='fal', style, size=25, color}){
    return <FontAwesomeIcon 
                icon={[variant, icon]}
                style={{
                    color: color,
                    fontSize: (
                        (
                            ( size === 'xs' && 15 ) ||
                            (
                                ( size === 'sm' && 20 ) ||
                                (
                                    ( size === 'md' && 25 ) ||
                                    (
                                        ( size === 'lg' && 30 ) ||
                                        (
                                            ( size === 'xl' && 35 ) || 
                                            size
                                        )
                                    )
                                )
                            ) 
                        )
                    ),
                    ...style,
                }}
            />
}
