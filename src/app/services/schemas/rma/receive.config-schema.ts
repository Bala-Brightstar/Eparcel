export interface ReceiveConfig {
    rmacompanyid: number;
    enablefields: boolean;
    validateloststolen: boolean;
    validateactivationlock: boolean;
    loststolenapi: string;
    activationlockapi: string;
    comments: ReceivingComment[];
}

export interface ReceivingComment {
    commentid: number;
    comment: string;
}