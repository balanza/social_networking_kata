import { Status } from '../../interfaces/index';
import * as moment from 'moment'

function formatDate(d: Date) {
    return moment(d).fromNow()
}

export function formatStatus({ author, message, time }: Status) {
    return `${message} (${formatDate(time)})`
}

export function formatStatusWithName({ author, message, time }: Status) {
    return `${author} - ${message} (${formatDate(time)})`
}

export function formatStatusList(l: Array<Status>, fn: (Status) => string): Array<string> {
    return l ? l.map(fn) : []
}