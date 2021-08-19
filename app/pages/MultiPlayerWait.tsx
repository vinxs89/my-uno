import { MultiPlayerWaitRouteProp, MultiPlayerWaitNavigationProp } from "../RouteProps";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "react-native";
import {v4 as uuidv4} from 'uuid';

type Props = {
    route: MultiPlayerWaitRouteProp;
    navigation: MultiPlayerWaitNavigationProp;
};

type ServerPlayer = {
    id: string;
    name: string;
}

export const MultiPlayerWaitPage = ( {route, navigation}: Props ) => {
    const { owner, name, playersCount }: { owner: boolean, name: string, roomCode?: number, playersCount?: number} = route.params;
    const [socket, setSocket] = useState(null as unknown as Socket);
    const [players, updatePlayers] = useState([] as ServerPlayer[]);
    const [roomCode, updateRoomCode] = useState(route.params.roomCode);

    const startGame = (code: string) => {
        socket.emit('start-game', code);
    };

    useEffect(() => {
        const newSocket = io("http://localhost:3005", { transports: ["websocket"] });
        setSocket(newSocket);
  
        newSocket.io.on("reconnect_attempt", () => {
            console.log("reconnect_attemp");
        });
        
        newSocket.io.on("reconnect", () => {
            console.log("reconnect");
        });

        newSocket.io.on("error", (e) => {
            console.log(e);
        });

        newSocket.io.on("reconnect_error", (e) => {
            console.log(e);
        });

        newSocket.io.on("reconnect_failed", () => {
            console.log("failed reconnect");
        });

        const playerId = uuidv4();

        newSocket.on("joined-room", (roomCode: string, players: ServerPlayer[]) => {
            updatePlayers(players);
            updateRoomCode(roomCode);
        });

        newSocket.on('started-game', (roomCode) => { navigation.navigate('Game', { playerId, roomCode, socket: newSocket }); });

        if (owner) {
            newSocket.emit('create-room', name, playerId, playersCount);
        } else {
            newSocket.emit('join-room', name, playerId, roomCode);
        }
        
        return () => {
            newSocket.off("joined-room");
            newSocket.off("start-game");
        }
    }, []);

    return (
        <div>
            <h3>Room Code: {roomCode}</h3>
            <ul>
                {
                    players.map(player => (
                        <li key={player.id}>{player.name}</li>
                    ))
                }
            </ul>
            {
                owner && playersCount  ? <Button onPress={() => startGame(roomCode)} title="Inizia" disabled={players.length < playersCount} /> : ''
            }
            
        </div>
    )
}