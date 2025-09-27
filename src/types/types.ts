export type SigninFormValues = {
    email: string;
    password: string;
};

export type SignupFormValues = {
    username:string;
    email: string;
    password: string;
};

export type UserDataType = {
    id:number;
    username:string;
    email:string;
    total_game_played:number;
    total_game_win:number;
    total_game_losses:number;
    total_game_draw:number;
    total_points:number;
}

export type GameMatchtype = {
    id : number;
    game_id : string;
    player_1 : string | any;
    player_2 : string | any;
    moves : [];
    winner : string | any;
    game_draw : boolean;
    player_2_status : string;
    game_status : string;
    created_at : string;
    updated_at : string;
}


export type LeaderBoardDataType = {
    id:number;
    username:string;
    email:string;
    total_game_played:number;
    total_game_win:number;
    total_game_losses:number;
    total_game_draw:number;
    total_points:number;
    win_rate:number;
    leaderboard_score:number;
    recent_game_played:number
}